import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { ContainerMaster } from "../Containers/ContainerMaster";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { Context } from "../../context/UserContext";

const Layout = () => {
  const navigate = useNavigate()
  const {authenticated} = useContext(Context)

  useEffect(() => {
    if(!authenticated && window.location.pathname !== '/') {
      navigate('/', {replace: true})
    }
  }, [authenticated, navigate])


  return (
    <ContainerMaster>
      <Header />
      <Outlet />
      <Footer />
    </ContainerMaster>
  );
};

export default Layout
