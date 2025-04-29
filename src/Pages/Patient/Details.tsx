import { useEffect, useState } from "react";
import { PatientProps } from "../Home/Home";
import api from "../../utils/api";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { PatientContainer } from "../../components/Containers/PatientContainer";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

export default function Details() {
  const [patient, setPatient] = useState<PatientProps | null>(null);
  const [token] = useState(
    localStorage.getItem("@dentist-management-token") || ""
  );
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

  const handleGoHome = () => {
    navigate("/home");
  };

  return !patient ? (
    <>
      <CircularProgress size="3.5rem" />
    </>
  ) : (
    <PatientContainer>
      <Button
        variant="outlined"
        startIcon={<KeyboardBackspaceOutlinedIcon />}
        onClick={handleGoHome}
      >
        Voltar
      </Button>
      <h2 className="text-white text-2xl text-center">{patient.name}</h2>
      <p className="text-white">CPF: {patient.cpf}</p>
      <p className="text-white">Telefone: {patient.phone}</p>
      <p className="text-white">Email: {patient.email}</p>
      <p className="text-white">Data de Nascimento: {patient.birthDate}</p>
      <p className="text-white">Endereço: {patient.address}</p>
      <p className="text-white">
        {" "}
        Cidade: {patient.city} / Estado: {patient.state}
      </p>
      <p className="text-white">CEP: {patient.zipCode}</p>
      <p className="text-white">Histórico: {patient.medicalHistory}</p>
      <div className="w-full flex items-center justify-center mx-auto mt-3">
        <Button
          variant="outlined"
          startIcon={<EditOutlinedIcon />}
          onClick={() => navigate(`/patient/edit/${id}`)}
        >
          Editar
        </Button>
      </div>
    </PatientContainer>
  );
}
