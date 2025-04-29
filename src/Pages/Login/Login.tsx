import { InputLogin } from "../../components/Inputs/InputLogin";
import { Button } from "@mui/material";
import { LoginContainer } from "../../components/Containers/LoginContainer";
import Logo from "../../assets/logo.png";
import { Context } from "../../context/UserContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const schema = z.object({
  email: z
    .string()
    .email("Formato de e-mail inválido")
    .nonempty("O campo e-mail é obrigatório"),
  password: z.string().nonempty("O campo senha é obrigatório"),
});

type FormData = z.infer<typeof schema>;

export const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login, authenticated } = useContext(Context);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema), mode: "onChange" });

  if (authenticated) {
    navigate("/home");
  }

  const handleLogin = async (data: FormData) => {
    setIsLoading(true);
    try {
      await login(data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = () => {
    navigate("/user/register");
  };

  return (
    <>
      <img className="max-w-60 md:max-w-md" src={Logo} alt="Logo" />
      <LoginContainer>
        <h1 className="text-2xl text-center text-blue-500">Faça o login</h1>
        <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-5">
          <InputLogin
            label="Usuário"
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
              Entrar
            </Button>
          )}
          <Button
            sx={{ marginTop: 1 }}
            variant="outlined"
            color="primary"
            onClick={handleRegister}
          >
            Criar usário
          </Button>
        </form>
      </LoginContainer>
    </>
  );
};
