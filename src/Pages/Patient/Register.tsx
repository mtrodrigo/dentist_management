import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PatientContainer } from "../../components/Containers/PatientContainer";
import Button from "@mui/material/Button";
import InputDetails from "../../components/Inputs/InputDetails";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import TextArea from "../../components/Inputs/TextArea";

export default function Register() {
  const [token] = useState(
    localStorage.getItem("@dentist-management-token") || ""
  );
  const navigate = useNavigate();
  const {register} = useForm()

  const updatePatient = async (e: React.FormEvent) => {   
    
  };

  return (
    <PatientContainer>
      <form
        className="flex flex-col gap-2 items-start justify-center mx-auto"
        onSubmit={updatePatient}
      >
        <Button
          variant="outlined"
          startIcon={<KeyboardBackspaceOutlinedIcon />}
          href="/home"
        >
          Voltar
        </Button>
        <InputDetails
          type="text"
          text="Nome:"
          {...register('name')}
        />
        <InputDetails
          type="text"
          text="E-mail:"
          {...register('email')}
        />
        <InputDetails
          type="text"
          text="Telefone:"
          {...register('phone')}
        />
        <InputDetails
          type="text"
          text="CPF:"
          {...register('cpf')}
        />
        <InputDetails
          type="text"
          text="Endereço:"
          {...register('address')}
        />
        <div className="flex flex-col gap-3 w-10/10 sm:flex-row">
          <InputDetails
            type="text"
            text="Cidade:"
            {...register('city')}
          />
          <InputDetails
            type="text"
            text="Estado:"
            {...register('state')}
          />
        </div>
        <div className="flex flex-col gap-3 w-10/10 sm:flex-row">
          <InputDetails
            type="text"
            text="CEP:"
            {...register('zipCode')}
          />
          <InputDetails
            type="text"
            text="Data Nascimento:"
            {...register('birthDate')}
          />
        </div>
        <TextArea
          text="Histórico do Paciente:"
          {...register('medicalHistory')}
        />
        <div className="flex gap-2 items-center justify-center w-full mt-5">
          <Button
            variant="outlined"
            type="submit"
            startIcon={<HowToRegIcon />}
          >
            Cadastrar
          </Button>
        </div>
      </form>
    </PatientContainer>
  );
}
