import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { ContainerMaster } from "../Containers/ContainerMaster";
import { Outlet } from "react-router-dom";
import { UserProvider } from "../../context/UserContext";

export const Layout = () => {
  
  return (
    <UserProvider>
      <ContainerMaster>
        <Header />
        <Outlet />
        <Footer />
      </ContainerMaster>
    </UserProvider>
  );
};
