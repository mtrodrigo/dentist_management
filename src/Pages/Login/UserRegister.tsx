import { InputLogin } from "../../components/Inputs/InputLogin";
import { Button, CircularProgress } from "@mui/material";
import { LoginContainer } from "../../components/Containers/LoginContainer";
import Logo from "../../assets/logo.png";
import { Context } from "../../context/UserContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import api from "../../utils/api";
import { ContainerMaster } from "../../components/Containers/ContainerMaster";
import { Footer } from "../../components/Footer/Footer";

interface UserRegisterProps {
  name: string;
  email: string;
  password: string;
  confirmpassword: string;
}

export const UserRegister = () => {
  const { register, handleSubmit } = useForm<UserRegisterProps>();
  const [ isLoading, setIsLoading ] = useState(false);
  const { login } = useContext(Context);
  const navigate = useNavigate();

  const handleRegister = async (data: UserRegisterProps) => {
    
    if (data.password !== data.confirmpassword) {
      toast.error("As senhas não coincidem!");
      return;
    }
    setIsLoading(true);
    try {
      await api.post(
        "/users/register",
        {
          name: data.name,
          email: data.email,
          password: data.password,
          confirmpassword: data.confirmpassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Cadastro realizado com sucesso!");
      setTimeout(() => {
        login({ email: data.email, password: data.password });
      }, 500);
    } catch (error: any) {
      console.error("Erro detalhado:", error.response?.data);

      let errorMessage = "Erro no cadastro";
      if (error.response) {
        errorMessage =
          error.response.data?.message || "Erro ao processar o cadastro";
      }

      toast.error(errorMessage);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    navigate("/");
  };

  return (
    <ContainerMaster>
      <img className="max-w-60 md:max-w-md" src={Logo} alt="Logo" />
      <LoginContainer>
        <h1 className="text-2xl text-center text-blue-500">Faça o cadastro</h1>
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="flex flex-col gap-5"
        >
          <InputLogin label="Nome" type="text" {...register("name")} />
          <InputLogin label="E-mail" type="email" {...register("email")} />
          <InputLogin label="Senha" type="password" {...register("password")} />
          <InputLogin
            label="Confirme a Senha"
            type="password"
            {...register("confirmpassword")}
          />
          {isLoading ? (
            <Button
              sx={{ marginTop: 1 }}
              variant="outlined"
              color="primary"
              disabled
            >
              <CircularProgress size={24} />
            </Button>
          ) : (
            <Button
              sx={{ marginTop: 1 }}
              variant="outlined"
              color="primary"
              type="submit"
            >
              Criar login
            </Button>
          )}
          <Button
            sx={{ marginTop: 1 }}
            variant="outlined"
            color="primary"
            onClick={handleLogin}
          >
            Já tem login
          </Button>
        </form>
      </LoginContainer>
      <Footer />
    </ContainerMaster>
  );
};
