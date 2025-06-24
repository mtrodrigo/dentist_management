import { useEffect, useState } from "react";
import { PatientProps } from "../Home/Home";
import api from "../../utils/api";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { PatientContainer } from "../../components/Containers/PatientContainer";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import InputDetails from "../../components/Inputs/InputDetails";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";
import TextArea from "../../components/Inputs/TextArea";

interface ImageData {
  id?: string;
  url: string;
  filename?: string;
}

interface ImagePreview {
  file: File;
  url: string;
  id: string;
}

interface PatientWithImages extends Omit<PatientProps, "images"> {
  images?: (ImageData | string)[];
}

export default function Details() {
  const [patient, setPatient] = useState<PatientWithImages | null>(null);
  const [newImages, setNewImages] = useState<ImagePreview[]>([]);
  const [removingImageId, setRemovingImageId] = useState<string | null>(null);
  const [token] = useState(
    localStorage.getItem("@dentist-management-token") || ""
  );
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/patients/mypatients/${id}`, {
        headers: {
          Authorization: `Bearer ${token ? JSON.parse(token) : ""}`,
        },
      })
      .then((response) => {
        setPatient(response.data.patient);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, token]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (patient) {
      setPatient({ ...patient, [name]: value });
    }
  };

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

        setNewImages((prev) => [...prev, newImage]);
      };
      reader.readAsDataURL(file);
    });

    event.target.value = "";
  };

  const removeNewImage = (imageId: string) => {
    setNewImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  const removeExistingImage = async (imageUrl: string) => {
    setRemovingImageId(imageUrl);

    try {
      console.log("Enviando requisição para deletar imagem:", {
        patientId: id,
        imageUrl,
      });

      const response = await api.delete(`/patients/${id}/images/delete`, {
        headers: {
          Authorization: `Bearer ${token ? JSON.parse(token) : ""}`,
          "Content-Type": "application/json",
        },
        data: {
          images: imageUrl,
        },
      });

      console.log("Resposta da API:", response.data);

      setPatient((prev) => {
        if (!prev) return null;

        const updatedImages = prev.images?.filter((img) => {
          if (typeof img === "string") {
            return img !== imageUrl;
          } else {
            return img.url !== imageUrl;
          }
        });

        return {
          ...prev,
          images: updatedImages,
        };
      });

      toast.success("Imagem removida com sucesso");
    } catch (error: any) {
      console.error("Erro completo:", error);

      let errorMessage = "Erro ao remover imagem";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      toast.error(errorMessage);
    } finally {
      setRemovingImageId(null);
    }
  };

  const updatePatient = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!patient) return;

    setIsLoading(true);
    let msgText = "Paciente editado com sucesso";

    try {
      const formData = new FormData();

      Object.entries(patient).forEach(([key, value]) => {
        if (key !== "images" && value !== null && value !== undefined) {
          formData.append(key, value.toString());
        }
      });

      newImages.forEach((image) => {
        formData.append("images", image.file);
      });

      const { data } = await api.patch(`/patients/mypatients/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token ? JSON.parse(token) : ""}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setPatient(data.patient);
      setNewImages([]);
      toast.success(msgText);
      navigate("/home");
    } catch (error) {
      console.error("Erro: ", error);
      msgText = "Erro ao fazer a edição";
      toast.error(msgText);
    } finally {
      setIsLoading(false);
    }
  };

  const removePatient = async () => {
    let msgText = "Paciente removido com sucesso";
    setIsLoading(true);

    try {
      await api.delete(`/patients/mypatients/${id}`, {
        headers: {
          Authorization: `Bearer ${token ? JSON.parse(token) : ""}`,
        },
      });
      toast.success(msgText);
      navigate("/home");
    } catch (error) {
      console.error("Erro: ", error);
      msgText = "Erro ao remover paciente";
      toast.error(msgText);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoHome = () => {
    navigate("/home");
  };

  return !patient ? (
    <>
      <CircularProgress size="3.5rem" />
    </>
  ) : (
    <PatientContainer>
      <form
        className="flex flex-col gap-2 items-start justify-center mx-auto"
        onSubmit={updatePatient}
      >
        <Button
          variant="outlined"
          startIcon={<KeyboardBackspaceOutlinedIcon />}
          onClick={handleGoHome}
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
                {(patient.images?.length || 0) + newImages.length} imagem(ns)
                total
              </span>
            </div>

            {patient.images && patient.images.length > 0 && (
              <div key="existing-images">
                <h4 className="text-sm font-medium mb-2">
                  Imagens Existentes:
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {patient.images.map((image, index) => {
                    const imgUrl =
                      typeof image === "string" ? image : image.url;
                    const imgId =
                      typeof image === "string"
                        ? `img-${index}`
                        : image.id || `img-${index}`;
                    const filename =
                      typeof image === "string"
                        ? `image-${index}.jpg`
                        : image.filename || `image-${index}.jpg`;

                    return (
                      <div
                        key={`existing-${imgId}`}
                        className="relative group border rounded-lg overflow-hidden"
                      >
                        <img
                          src={imgUrl}
                          alt="Imagem do paciente"
                          className="w-full h-24 object-cover"
                          onError={(e) => {
                            console.error("Erro ao carregar imagem:", imgUrl);
                            const target = e.currentTarget as HTMLImageElement;
                            target.src =
                              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMiAxNkM5Ljc5IDEwLjEgOS43OSAxMy45IDEyIDE2WiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K";
                            target.classList.add("bg-gray-100");
                          }}
                        />
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            removeExistingImage(imgUrl);
                          }}
                          className="absolute top-1 right-1 min-w-0 w-8 h-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                          disabled={removingImageId === imgId}
                        >
                          {removingImageId === imgId ? (
                            <CircularProgress size={12} />
                          ) : (
                            <DeleteIcon fontSize="small" />
                          )}
                        </Button>
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
                          {filename}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {newImages.length > 0 && (
              <div key="new-images">
                <h4 className="text-sm font-medium mb-2">Novas Imagens:</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {newImages.map((image) => (
                    <div
                      key={`new-${image.id}`}
                      className="relative group border rounded-lg overflow-hidden border-dashed border-blue-300"
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
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          removeNewImage(image.id);
                        }}
                        className="absolute top-1 right-1 min-w-0 w-8 h-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity z-10"
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
              </div>
            )}
          </div>
        </div>

        <InputDetails
          name="name"
          type="text"
          text="Nome:"
          value={patient.name || ""}
          onChange={handleChange}
        />
        <InputDetails
          name="email"
          type="text"
          text="E-mail:"
          value={patient.email || ""}
          onChange={handleChange}
        />
        <InputDetails
          name="phone"
          type="text"
          text="Telefone:"
          value={patient.phone || ""}
          onChange={handleChange}
        />
        <InputDetails
          name="cpf"
          type="text"
          text="CPF:"
          value={patient.cpf || ""}
          onChange={handleChange}
        />
        <InputDetails
          name="address"
          type="text"
          text="Endereço:"
          value={patient.address || ""}
          onChange={handleChange}
        />
        <div className="flex flex-col gap-3 w-10/10 sm:flex-row">
          <InputDetails
            name="city"
            type="text"
            text="Cidade:"
            value={patient.city || ""}
            onChange={handleChange}
          />
          <InputDetails
            name="state"
            type="text"
            text="Estado:"
            value={patient.state || ""}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-3 w-10/10 sm:flex-row">
          <InputDetails
            name="zipCode"
            type="text"
            text="CEP:"
            value={patient.zipCode || ""}
            onChange={handleChange}
          />
          <InputDetails
            name="birthDate"
            type="text"
            text="Data Nascimento:"
            value={patient.birthDate || ""}
            onChange={handleChange}
          />
        </div>
        <TextArea
          name="medicalHistory"
          text="Histórico do Paciente:"
          value={patient.medicalHistory || ""}
          onChange={(e) => handleChange(e)}
        />
        <div className="flex gap-2 items-center justify-between w-full mt-5">
          {isLoading ? (
            <Button
              variant="outlined"
              color="primary"
              disabled
              startIcon={<CircularProgress size={24} />}
            >
              Editando
            </Button>
          ) : (
            <Button
              variant="outlined"
              startIcon={<EditOutlinedIcon />}
              color="primary"
              type="submit"
            >
              Editar
            </Button>
          )}
          {isLoading ? (
            <Button
              variant="outlined"
              color="primary"
              disabled
              startIcon={<CircularProgress size={24} />}
            >
              Removendo
            </Button>
          ) : (
            <Button
              variant="outlined"
              startIcon={<DeleteOutlineOutlinedIcon />}
              color="error"
              type="button"
              onClick={removePatient}
            >
              Remover
            </Button>
          )}
        </div>
      </form>
    </PatientContainer>
  );
}
