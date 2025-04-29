import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { ContainerMaster } from "../Containers/ContainerMaster";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { Context } from "../../context/UserContext";
import { CircularProgress } from "@mui/material";

const Layout = () => {
  const navigate = useNavigate()
  const {authenticated, loading} = useContext(Context)

  useEffect(() => {
    if(!loading && !authenticated && window.location.pathname !== '/') {
      navigate('/', {replace: true})
    }
  }, [authenticated, loading, navigate])

  if(loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress size="3.5rem" />
      </div>
    )
  }
  return (
    <ContainerMaster>
      <Header />
      <Outlet />
      <Footer />
    </ContainerMaster>
  );
};

export default Layout
