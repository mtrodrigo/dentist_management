import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PatientContainer } from "../../components/Containers/PatientContainer";
import Button from "@mui/material/Button";
import InputDetails from "../../components/Inputs/InputDetails";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import TextArea from "../../components/Inputs/TextArea";
import api from "../../utils/api";
import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type CheckCepEvent = React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>;

const schema = z.object({
  name: z.string().nonempty("O campo nome é obrigatório"),
  email: z.string().email("Formato de e-mail inválido").nonempty("O campo e-mail é obrigatório"),
  phone: z.string().nonempty("O campo telefone é obrigatório"),
  cpf: z.string().nonempty("O campo CPF é obrigatório"),
  address: z.string().nonempty("O campo endereço é obrigatório"),
  city: z.string().nonempty("O campo cidade é obrigatório"),
  state: z.string().nonempty("O campo estado é obrigatório"),
  birthDate: z.string().nonempty("O campo data de nascimento é obrigatório"),
  zipCode: z.string().nonempty("O campo CEP é obrigatório"),
  medicalHistory: z.string().nonempty(),
})
 type FormData = z.infer<typeof schema>;

export default function Register() {
  const [token] = useState(
    localStorage.getItem("@dentist-management-token") || ""
  );
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: {errors}} = useForm<FormData>({resolver: zodResolver(schema), mode: "onChange"});

  const updatePatient = async (data: FormData) => {
    let msgText = "Paciente cadastrado com sucesso";
    setIsLoading(true);

    try {
      await api.post("/patients/create", data, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });

      toast.success(msgText);
      navigate("/home");
    } catch (error) {
      console.error("Erro: ", error);
      msgText = "Erro ao cadastrar paciente, tente novamente";
      toast.error(msgText);
      setIsLoading(false);
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
          console.log("response", response);
          
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
        onSubmit={handleSubmit(updatePatient)}
      >
        <Button
          variant="outlined"
          startIcon={<KeyboardBackspaceOutlinedIcon />}
          onClick={() => navigate("/home")}
        >
          Voltar
        </Button>
        <InputDetails type="text" text="Nome:" {...register("name")} error={errors.name?.message}/>
        <InputDetails type="text" text="E-mail:" {...register("email")} error={errors.email?.message} />
        <InputDetails type="text" text="Telefone:" {...register("phone")} error={errors.phone?.message} />
        <InputDetails type="text" text="CPF:" {...register("cpf")} error={errors.cpf?.message} />
        <div className="flex flex-col gap-3 w-10/10 sm:flex-row">
          <InputDetails
            type="text"
            text="Data Nascimento:"
            {...register("birthDate")}
            error={errors.birthDate?.message}
          />
          <InputDetails type="text" text="CEP:" {...register("zipCode")} onBlur={checkCep} error={errors.zipCode?.message}/>
        </div>
        <InputDetails type="text" text="Endereço:" {...register("address")} error={errors.address?.message} />
        <div className="flex flex-col gap-3 w-10/10 sm:flex-row">
          <InputDetails type="text" text="Cidade:" {...register("city")} error={errors.city?.message} />
          <InputDetails type="text" text="Estado:" {...register("state")} error={errors.state?.message} />
        </div>
        <TextArea
          text="Histórico do Paciente:"
          {...register("medicalHistory")}
          error={errors.email?.message}
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
