import { InputLogin } from "../../components/Inputs/InputLogin";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { LoginContainer } from "../../components/Containers/LoginContainer";
import Logo from '../../assets/logo.png'
import { Context } from "../../context/UserContext";
import { useContext } from "react";
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  email: z.string().email('E-mail inválido').nonempty('E-mail é obrigatório'),
  password: z.string().nonempty('Senha é obrigatória'),
})

export const Login = () => {

  const {register, handleSubmit, formState} = useForm({
    resolver: zodResolver(schema),
  });
  const { login } = useContext(Context);


  const handleLogin = (data) => {
    data.preventDefault();
    const user = {
      email: data.email,
      password: data.password,
    };
    login(user);
  }

  return (
    <>
      <img
        className="max-w-60 md:max-w-md"
        src={Logo}
        alt="Logo"
      />
      <LoginContainer>
        <h1 className="text-2xl text-center text-blue-500">Faça o login</h1>
        <form 
          onSubmit={handleSubmit(handleLogin)} 
          className="flex flex-col gap-5"
        >
          <InputLogin 
            label="Usuário" 
            type="email" 
            {...register('email')} />
          <InputLogin 
            label="Senha" 
            type="password" 
            {...register('password')} />
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
