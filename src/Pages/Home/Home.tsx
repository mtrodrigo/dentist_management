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
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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
  images: string[];
}

export const Home = () => {
  const [patients, setPatients] = useState<PatientProps[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [token] = useState(
    localStorage.getItem("@dentist-management-token") || ""
  );
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    api
      .get("/patients/mypatients", {
        headers: {
          Authorization: `Bearer ${token ? JSON.parse(token) : ""}`,
        },
      })
      .then((response) => {
        setPatients(response.data.patients);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  const handleRegister = () => {
    navigate("/patient/register");
  };

  const handleDetails = (id: string) => {
    navigate(`/patient/${id}`);
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress size="3.5rem" />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: isSmallMobile ? "12px" : "16px",
        fontSize: isSmallMobile ? "1.1rem" : "inherit",
      }}
    >
      {patients?.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={3}
          minHeight="70vh"
          textAlign="center"
          p={2}
        >
          <Typography
            variant="h6"
            sx={{ fontSize: isSmallMobile ? "1.3rem" : "1.5rem" }}
          >
            Você ainda não possui pacientes cadastrados.
          </Typography>
          <Button
            variant="contained"
            startIcon={<HowToRegIcon />}
            onClick={handleRegister}
            fullWidth={isSmallMobile}
            size="large"
            sx={{
              fontSize: isSmallMobile ? "1rem" : "1.1rem",
              padding: isSmallMobile ? "10px 16px" : "8px 16px",
            }}
          >
            Cadastrar Paciente
          </Button>
        </Box>
      ) : (
        <>
          <Box mb={3}>
            <Button
              variant="contained"
              startIcon={<HowToRegIcon />}
              onClick={handleRegister}
              fullWidth={isSmallMobile}
              size="large"
              sx={{
                fontSize: isSmallMobile ? "1rem" : "1.1rem",
                padding: isSmallMobile ? "12px 16px" : "8px 16px",
              }}
            >
              Cadastrar Paciente
            </Button>
          </Box>

          <TableContainer
            component={Paper}
            sx={{
              width: "100%",
              overflowX: "auto",
              fontSize: isSmallMobile ? "1rem" : "0.875rem",
            }}
          >
            <Table
              size={isSmallMobile ? "medium" : "small"}
              sx={{
                "& .MuiTableCell-root": {
                  fontSize: isSmallMobile ? "1rem" : "0.875rem",
                  padding: isSmallMobile ? "12px 8px" : "8px 6px",
                },
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: isSmallMobile ? "1.1rem" : "0.875rem",
                    }}
                  >
                    Nome
                  </TableCell>
                  {!isSmallMobile && (
                    <>
                      <TableCell
                        align="center"
                        sx={{
                          fontWeight: "bold",
                          fontSize: isSmallMobile ? "1.1rem" : "0.875rem",
                        }}
                      >
                        CPF
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontWeight: "bold",
                          fontSize: isSmallMobile ? "1.1rem" : "0.875rem",
                        }}
                      >
                        Cidade
                      </TableCell>
                    </>
                  )}
                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: "bold",
                      fontSize: isSmallMobile ? "1.1rem" : "0.875rem",
                    }}
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patients?.map((patient) => (
                  <TableRow
                    key={patient.cpf}
                    hover
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                    onClick={() => handleDetails(patient._id)}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontSize: isSmallMobile ? "1rem" : "0.875rem" }}
                    >
                      <Typography
                        variant="body1"
                        noWrap={false}
                        sx={{ fontSize: isSmallMobile ? "1rem" : "0.875rem" }}
                      >
                        {patient.name}
                      </Typography>
                      {isSmallMobile && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontSize: "0.95rem" }}
                        >
                          {patient.city}
                        </Typography>
                      )}
                    </TableCell>
                    {!isSmallMobile && (
                      <>
                        <TableCell
                          align="center"
                          sx={{ fontSize: isSmallMobile ? "1rem" : "0.875rem" }}
                        >
                          {patient.cpf}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ fontSize: isSmallMobile ? "1rem" : "0.875rem" }}
                        >
                          {patient.city}
                        </TableCell>
                      </>
                    )}
                    <TableCell align="right">
                      <Button
                        size={isSmallMobile ? "medium" : "small"}
                        variant="outlined"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDetails(patient._id);
                        }}
                        sx={{
                          fontSize: isSmallMobile ? "0.95rem" : "0.875rem",
                          padding: isSmallMobile ? "8px 12px" : "6px 8px",
                          minWidth: isSmallMobile ? "80px" : "100px",
                        }}
                      >
                        {isSmallMobile ? "Detalhes" : "Ver"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
};
