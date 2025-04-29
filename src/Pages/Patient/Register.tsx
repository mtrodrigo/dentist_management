import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PatientContainer } from "../../components/Containers/PatientContainer";
import Button from "@mui/material/Button";
import InputDetails from "../../components/Inputs/InputDetails";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import TextArea from "../../components/Inputs/TextArea";
import { PatientProps } from "../Home/Home";
import api from "../../utils/api";
import toast from "react-hot-toast";

type CheckCepEvent = React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>;

export default function Register() {
  const [token] = useState(
    localStorage.getItem("@dentist-management-token") || ""
  );
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<PatientProps>();

  const updatePatient = async (data: Record<string, any>) => {
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
          return response.json();
        })
        .then((data) => {
          if (data.erro) {
            toast.error("CEP não encontrado");
            return;
          }
          setValue("address", data.address);
          setValue("city", data.city);
          setValue("state", data.state);
        })
        .catch((error) => {
          console.error("Erro: ", error);
          toast.error("Erro ao buscar CEP");
        });
    }
  };

  const handleGoHome = () => {
    navigate('/home')
  }

  return (
    <PatientContainer>
      <form
        className="flex flex-col gap-2 items-start justify-center mx-auto"
        onSubmit={handleSubmit(updatePatient)}
      >
        <Button
          variant="outlined"
          startIcon={<KeyboardBackspaceOutlinedIcon />}
          onClick={handleGoHome}
        >
          Voltar
        </Button>
        <InputDetails type="text" text="Nome:" {...register("name")} />
        <InputDetails type="text" text="E-mail:" {...register("email")} />
        <InputDetails type="text" text="Telefone:" {...register("phone")} />
        <InputDetails type="text" text="CPF:" {...register("cpf")} />
        <InputDetails type="text" text="Endereço:" {...register("address")} />
        <div className="flex flex-col gap-3 w-10/10 sm:flex-row">
          <InputDetails type="text" text="Cidade:" {...register("city")} />
          <InputDetails type="text" text="Estado:" {...register("state")} />
        </div>
        <div className="flex flex-col gap-3 w-10/10 sm:flex-row">
          <InputDetails
            type="text"
            text="Data Nascimento:"
            {...register("birthDate")}
          />
          <InputDetails type="text" text="CEP:" {...register("zipCode")} onBlur={checkCep}/>
        </div>
        <TextArea
          text="Histórico do Paciente:"
          {...register("medicalHistory")}
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
