import { Home } from "./Pages/Home/Home";
import { Login } from "./Pages/Login/Login";
import Details from "./Pages/Patient/Details";
import { Layout } from "./components/Layout/Layout";
import { createBrowserRouter } from "react-router-dom";


const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/patient/:id",
        element: <Details />
      }
    ],
  },
]);
export { router };
