import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useNavigate } from "react-router-dom";

export interface PatientProps {
  _id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  birthDate: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  medicalHistory: string;
}

export const Home = () => {
  const [patients, setPatients] = useState<PatientProps[] | null>(null);
  const [isLoading, setIsLoadin] = useState<boolean>(true);
  const [token] = useState(
    localStorage.getItem("@dentist-management-token") || ""
  );
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/patients/mypatients", {
        headers: {
          Authorization: `Bearer ${token ? JSON.parse(token) : ""}`,
        },
      })
      .then((response) => {
        setPatients(response.data.patients);
        setIsLoadin(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleRegister = () => {
    navigate("/patient/register");
  };

  const handleDetails = (id: string) => {
    navigate(`/patient/${id}`);
  };

  return isLoading ? (
    <>
      <CircularProgress size="3.5rem" />
    </>
  ) : (
    <main className="px-3">
      {patients?.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3">
          <h2 className="text-center text-2xl text-blue-500">
            Você ainda não possui pacientes cadastrados.
          </h2>
          <Button
            variant="outlined"
            startIcon={<HowToRegIcon />}
            onClick={handleRegister}
          >
            Cadastrar
          </Button>
        </div>
      ) : (
        <>
          <Button
            variant="outlined"
            startIcon={<HowToRegIcon />}
            onClick={handleRegister}
          >
            Cadastrar
          </Button>
          <TableContainer component={Paper}>
            <Table
              sx={{ maxWidth: 650, color: "transparent" }}
              size="small"
              aria-label=""
            >
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell align="center">CPF</TableCell>
                  <TableCell align="center">Cidade</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patients?.map((patient) => (
                  <TableRow
                    key={patient.cpf}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {patient.name}
                    </TableCell>
                    <TableCell align="right">{patient.cpf}</TableCell>
                    <TableCell align="center">{patient.city}</TableCell>
                    <TableCell align="center">
                      <Button
                        size="small"
                        onClick={() => handleDetails(patient._id)}
                      >
                        Detalhes
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </main>
  );
};
