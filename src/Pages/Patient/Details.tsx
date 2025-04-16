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
import TextArea from "../../components/Inputs/TextArea";

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (patient) {
      setPatient({ ...patient, [name]: value });
    }
  };

  const updatePatient = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!patient) return;

    let msgText = "Paciente editado com sucesso";

    try {
      const { data } = await api.patch(`/patients/mypatients/${id}`, patient, {
        headers: {
          Authorization: `Bearer ${token ? JSON.parse(token) : ""}`,
        },
      });

      setPatient(data.patient);
      toast.success(msgText);
      navigate("/home");
    } catch (error) {
      console.log("Erro: ", error);
      msgText = "Erro ao fazer a edição";
      toast.error(msgText);
    }
  };

  const removePatient = async () => {
    let msgText = "Paciente removido com sucesso";

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
    }
  };

  const handleGoHome = () => {
    navigate('/home')
  }

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
          <Button
            variant="outlined"
            type="submit"
            startIcon={<EditOutlinedIcon />}
          >
            Editar
          </Button>
          <Button
            variant="outlined"
            startIcon={<DeleteOutlineOutlinedIcon />}
            color="error"
            onClick={removePatient}
          >
            Apagar
          </Button>
        </div>
      </form>
    </PatientContainer>
  );
}
