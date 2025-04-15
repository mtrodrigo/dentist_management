import { InputLogin } from "../../components/Inputs/InputLogin";
import { Button } from "@mui/material";
import { LoginContainer } from "../../components/Containers/LoginContainer";
import Logo from "../../assets/logo.png";
import { Context } from "../../context/UserContext";
import { useContext, useState } from "react";

interface UserProps {
  email: string;
  password: string;
}

export const Login = () => {
  const [user, setUser] = useState<UserProps>({
    email: "",
    password: "",
  });
  const { login } = useContext(Context);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(user);
  };

  return (
    <>
      <img className="max-w-60 md:max-w-md" src={Logo} alt="Logo" />
      <LoginContainer>
        <h1 className="text-2xl text-center text-blue-500">Faça o login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <InputLogin
            label="Usuário"
            type="email"
            name="email"
            onChange={handleChange}
          />
          <InputLogin
            label="Senha"
            type="password"
            name="password"
            onChange={handleChange}
          />
          <Button
            sx={{ marginTop: 2 }}
            variant="outlined"
            color="primary"
            type="submit"
          >
            Entrar
          </Button>
        </form>
      </LoginContainer>
    </>
  );
};
