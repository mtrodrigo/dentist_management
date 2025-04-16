import { Home } from "./Pages/Home/Home";
import { Login } from "./Pages/Login/Login";
import Details from "./Pages/Patient/Details";
import Register from "./Pages/Patient/Register";
import { Layout } from "./components/Layout/Layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/patient/:id" element={<Details />} />
          <Route path="/patient/register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;

