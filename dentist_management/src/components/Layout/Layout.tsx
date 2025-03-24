import { Header } from "../Header/Header"
import { Footer } from "../Footer/Footer"
import { ContainerMaster } from "../Containers/ContainerMaster"
import { Outlet } from "react-router-dom";


export const Layout = () => {
    return (
        <ContainerMaster>
            <Header />
            <Outlet />
            <Footer />
        </ContainerMaster>

    )
}