import { Home } from "./Pages/Home/Home";
import { Login } from "./Pages/Login/Login";
import Details from "./Pages/Patient/Details";
import Register from "./Pages/Patient/Register";
import Layout from "./components/Layout/Layout";
import { UserRegister } from "./Pages/Login/UserRegister";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/user/register" element={<UserRegister />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/patient/:id" element={<Details />} />
            <Route path="/patient/register" element={<Register />} />
          </Route>
        </Routes>
      </UserProvider>
    </Router>
  );
}
export default App;
