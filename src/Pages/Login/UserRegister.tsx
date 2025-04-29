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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().nonempty("O campo nome é obrigatório"),
  email: z
    .string()
    .email("Formato de e-mail inválido")
    .nonempty("O campo e-mail é obrigatório"),
  password: z.string().nonempty("O campo senha é obrigatório"),
  confirmpassword: z.string().nonempty("O campo confirmar senha é obrigatório"),
});

type FormData = z.infer<typeof schema>;

export const UserRegister = () => {
  const [ isLoading, setIsLoading ] = useState(false);
  const { login } = useContext(Context);
  const navigate = useNavigate();
  const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({ resolver: zodResolver(schema), mode: "onChange" });

  const handleRegister = async (data: FormData) => {
    
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


  return (
    <ContainerMaster>
      <img className="max-w-60 md:max-w-md" src={Logo} alt="Logo" />
      <LoginContainer>
        <h1 className="text-2xl text-center text-blue-500">Faça o cadastro</h1>
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="flex flex-col gap-5"
        >
          <InputLogin
            label="Nome"
            type="text"
            name="name"
            error={errors.name?.message}
            register={register}
          />
          <InputLogin
            label="E-mail"
            type="email"
            name="email"
            error={errors.email?.message}
            register={register}
          />
          <InputLogin
            label="Senha"
            type="password"
            name="password"
            error={errors.password?.message}
            register={register}
          />
          <InputLogin
            label="Confirmar senha"
            type="password"
            name="confirmpassword"
            error={errors.confirmpassword?.message}
            register={register}
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
            onClick={() => navigate("/")}
          >
            Já tem login
          </Button>
        </form>
      </LoginContainer>
      <Footer />
    </ContainerMaster>
  );
};
