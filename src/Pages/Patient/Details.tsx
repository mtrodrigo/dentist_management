import { useEffect, useState } from "react";
import { PatientProps } from "../Home/Home";
import api from "../../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import { PatientContainer } from "../../components/Containers/PatientContainer";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, Chip, Grid, IconButton, Modal, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function Details() {
  const [patient, setPatient] = useState<PatientProps | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [token] = useState(
    localStorage.getItem("@dentist-management-token") || ""
  );
  const { id } = useParams();
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      {patient.images && patient.images.length > 0 && (
        <Box sx={{ width: "100%", my: 3 }}>
          <Typography variant="h6" gutterBottom color="white">
            Imagens:
          </Typography>

          <Grid container spacing={2}>
            {patient.images.map((image, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 1,
                    position: "relative",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    "&:hover": {
                      boxShadow: 4,
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => handleImageClick(image)}
                >
                  <Box
                    component="img"
                    src={image}
                    alt={`Imagem ${index + 1}`}
                    sx={{
                      width: "100%",
                      height: 200,
                      objectFit: "contain",
                      bgcolor: "grey.100",
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 1,
                    }}
                  >
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: isMobile ? 0 : "50%",
            left: isMobile ? 0 : "50%",
            right: isMobile ? 0 : undefined,
            bottom: isMobile ? 0 : undefined,
            transform: isMobile ? "none" : "translate(-50%, -50%)",
            width: isMobile ? "100%" : "auto",
            height: isMobile ? "100%" : "auto",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
            outline: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "#e7000b",
            }}
          >
            <CloseIcon />
          </IconButton>

          <img
            src={selectedImage}
            alt="Imagem ampliada"
            style={{
              maxWidth: "100%",
              maxHeight: isMobile ? "calc(100vh - 64px)" : "80vh",
              objectFit: "contain",
            }}
          />
        </Box>
      </Modal>
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
