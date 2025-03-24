import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ContainerMaster } from "./components/ContainerMaster"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContainerMaster>
      <App />
    </ContainerMaster>
  </StrictMode>,
)
