import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PatientContainer } from "../../components/Containers/PatientContainer";
import Button from "@mui/material/Button";
import InputDetails from "../../components/Inputs/InputDetails";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import DeleteIcon from "@mui/icons-material/Delete";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import TextArea from "../../components/Inputs/TextArea";
import api from "../../utils/api";
import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type CheckCepEvent = React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>;

interface ImagePreview {
  file: File;
  url: string;
  id: string;
}

const schema = z.object({
  name: z.string().nonempty("O campo nome é obrigatório"),
  email: z
    .string()
    .email("Formato de e-mail inválido")
    .nonempty("O campo e-mail é obrigatório"),
  phone: z.string().nonempty("O campo telefone é obrigatório"),
  cpf: z.string().nonempty("O campo CPF é obrigatório"),
  address: z.string().nonempty("O campo endereço é obrigatório"),
  city: z.string().nonempty("O campo cidade é obrigatório"),
  state: z.string().nonempty("O campo estado é obrigatório"),
  birthDate: z.string().nonempty("O campo data de nascimento é obrigatório"),
  zipCode: z.string().nonempty("O campo CEP é obrigatório"),
  medicalHistory: z.string().nonempty(),
});
type FormData = z.infer<typeof schema>;

export default function Register() {
  const [token] = useState(
    localStorage.getItem("@dentist-management-token") || ""
  );
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImagePreview[]>([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onChange" });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error("Por favor, selecione apenas arquivos de imagem");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("Imagem muito grande. Máximo 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage: ImagePreview = {
          file,
          url: e.target?.result as string,
          id: Math.random().toString(36).substr(2, 9),
        };

        setImages((prev) => [...prev, newImage]);
      };
      reader.readAsDataURL(file);
    });

    event.target.value = "";
  };

  const removeImage = (imageId: string) => {
    setImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  const registerPatient = async (data: FormData) => {
    let msgText = "Paciente cadastrado com sucesso";
    setIsLoading(true);

    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      images.forEach((image) => {
        formData.append(`images`, image.file);
      });

      await api.post("/patients/create", formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(msgText);
      navigate("/home");
    } catch (error) {
      console.error("Erro: ", error);
      msgText = "Erro ao cadastrar paciente, tente novamente";
      toast.error(msgText);
    } finally {
      setIsLoading(false);
    }
  };

  const checkCep = (e: CheckCepEvent): void => {
    if (e.target instanceof HTMLInputElement) {
      const cep: string = e.target.value.replace(/\D/g, "");
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro ao buscar CEP");
          }
          return response.json();
        })
        .then((data) => {
          if (data.erro) {
            toast.error("CEP não encontrado");
            return;
          }
          setValue("address", data.logradouro);
          setValue("city", data.localidade);
          setValue("state", data.uf);
        })
        .catch((error) => {
          console.error("Erro: ", error);
          toast.error("Erro ao buscar CEP");
        });
    }
  };

  return (
    <PatientContainer>
      <form
        className="flex flex-col gap-2 items-start justify-center mx-auto"
        onSubmit={handleSubmit(registerPatient)}
      >
        <Button
          variant="outlined"
          startIcon={<KeyboardBackspaceOutlinedIcon />}
          onClick={() => navigate("/home")}
        >
          Voltar
        </Button>

        <div className="my-3 w-full">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <input
                type="file"
                id="image-upload"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button
                variant="outlined"
                component="label"
                htmlFor="image-upload"
                startIcon={<PhotoCameraIcon />}
                disabled={isLoading}
              >
                Adicionar Imagens
              </Button>
              <span className="text-sm text-gray-500">
                {images.length} imagem(ns) selecionada(s)
              </span>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="relative group border rounded-lg overflow-hidden"
                  >
                    <img
                      src={image.url}
                      alt="Preview"
                      className="w-full h-24 object-cover"
                    />
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => removeImage(image.id)}
                      className="absolute top-1 right-1 min-w-0 w-8 h-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      disabled={isLoading}
                    >
                      <DeleteIcon fontSize="small" />
                    </Button>
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
                      {image.file.name}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <InputDetails
          type="text"
          text="Nome:"
          {...register("name")}
          error={errors.name?.message}
        />
        <InputDetails
          type="text"
          text="E-mail:"
          {...register("email")}
          error={errors.email?.message}
        />
        <InputDetails
          type="text"
          text="Telefone:"
          {...register("phone")}
          error={errors.phone?.message}
        />
        <InputDetails
          type="text"
          text="CPF:"
          {...register("cpf")}
          error={errors.cpf?.message}
        />
        <div className="flex flex-col gap-3 w-10/10 sm:flex-row">
          <InputDetails
            type="text"
            text="Data Nascimento:"
            {...register("birthDate")}
            error={errors.birthDate?.message}
          />
          <InputDetails
            type="text"
            text="CEP:"
            {...register("zipCode")}
            onBlur={checkCep}
            error={errors.zipCode?.message}
          />
        </div>
        <InputDetails
          type="text"
          text="Endereço:"
          {...register("address")}
          error={errors.address?.message}
        />
        <div className="flex flex-col gap-3 w-10/10 sm:flex-row">
          <InputDetails
            type="text"
            text="Cidade:"
            {...register("city")}
            error={errors.city?.message}
          />
          <InputDetails
            type="text"
            text="Estado:"
            {...register("state")}
            error={errors.state?.message}
          />
        </div>
        <TextArea
          text="Histórico do Paciente:"
          {...register("medicalHistory")}
          error={errors.medicalHistory?.message}
        />
        <div className="flex gap-2 items-center justify-center w-full mt-5">
          <Button
            variant="outlined"
            color="primary"
            type="submit"
            disabled={isLoading}
            startIcon={<HowToRegIcon />}
          >
            {isLoading ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </div>
      </form>
    </PatientContainer>
  );
}
