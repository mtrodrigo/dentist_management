import { Home } from "./Pages/Home/Home"
import { Login } from "./Pages/Login/Login"
import { Layout } from "./components/Layout/Layout"
import { createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      }
    ]
  }
])
export {router}
 



