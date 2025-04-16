import { useEffect, useState } from "react";
import { PatientProps } from "../Home/Home";
import api from "../../utils/api";
import { useParams } from "react-router-dom";
import { PatientContainer } from "../../components/Containers/PatientContainer";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import InputDetails from "../../components/Inputs/InputDetails";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import TextArea from "../../components/Inputs/TextArea";

export default function Details() {
  const [patient, setPatient] = useState<PatientProps | null>(null);
  const [token] = useState(
    localStorage.getItem("@dentist-management-token") || ""
  );
  const { id } = useParams();

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
  }, [id]);

  return !patient ? (
    <>
      <CircularProgress size="3.5rem" />
    </>
  ) : (
    <PatientContainer>
      <Button variant="outlined" startIcon={<KeyboardBackspaceOutlinedIcon />} href="/home">
        Voltar
      </Button>
      <InputDetails
        name="name"
        type="text"
        text="Nome:"
        value={patient.name}
        onChange={() => {}}
      />
      <InputDetails
        name="email"
        type="text"
        text="E-mail:"
        value={patient.email}
        onChange={() => {}}
      />
      <InputDetails
        name="phone"
        type="text"
        text="Telefone:"
        value={patient.phone}
        onChange={() => {}}
      />
      <InputDetails
        name="cpf"
        type="text"
        text="CPF:"
        value={patient.cpf}
        onChange={() => {}}
      />
      <InputDetails
        name="address"
        type="text"
        text="Endereço:"
        value={patient.address}
        onChange={() => {}}
      />
      <div className="flex flex-col gap-3 w-10/10 sm:flex-row">
        <InputDetails
          name="city"
          type="text"
          text="Cidade:"
          value={patient.city}
          onChange={() => {}}
        />
        <InputDetails
          name="state"
          type="text"
          text="Estado:"
          value={patient.state}
          onChange={() => {}}
        />
      </div>
      <div className="flex flex-col gap-3 w-10/10 sm:flex-row">
        <InputDetails
          name="zipCode"
          type="text"
          text="CEP:"
          value={patient.zipCode}
          onChange={() => {}}
        />
        <InputDetails
          name="birthDate"
          type="text"
          text="Data Nascimento:"
          value={patient.birthDate}
          onChange={() => {}}
        />
      </div>
      <TextArea
        name="medicalHistory"
        text="Histórico do Paciente:"
        value={patient.medicalHistory}
        onChange={() => {}}
      />
      <div className="flex gap-2 items-center justify-between w-full mt-5">
        <Button
          variant="outlined"
          startIcon={<EditOutlinedIcon />}
        >
          Editar
        </Button>
        <Button
          variant="outlined"
          startIcon={<DeleteOutlineOutlinedIcon />}
          color="error"
        >
          Apagar
        </Button>
      </div>
    </PatientContainer>
  );
}
