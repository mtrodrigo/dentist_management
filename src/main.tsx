import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
//import { RouterProvider } from "react-router-dom";
//import { router } from "./App";
import { Toaster } from "react-hot-toast";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster position="top-center" reverseOrder={false} />
    {/* <RouterProvider router={router} /> */}
    <App />
  </StrictMode>
);
