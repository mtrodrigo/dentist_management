import { useEffect, useState } from "react";
import api from '../utils/api'
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface AuthUserProps {
    email: string,
    password: string,
    token?: string
}

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("@dentist-management-token");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }
  }, []);
  const authUser = async (data: AuthUserProps)  => {
    setAuthenticated(true);

    localStorage.setItem(
      "@dentist-management-token",
      JSON.stringify(data.token)
    );
  };

  const login = async (user: AuthUserProps) => {
    let msgText = "Login realizado com sucesso";

    try {
      const data = await api.post("/users/login", user).then((response) => {
        return response.data;
      });
      await authUser(data);
      navigate('/')
    } catch (error) {
      if (error instanceof Error && (error as any).response?.data) {
        msgText = (error as any).response.data;
      }
      toast.error(msgText);
    }

    toast.success(msgText);
  };
  return { authenticated, login }
}
