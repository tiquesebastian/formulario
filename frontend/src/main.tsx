import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Punto de arranque del frontend: monta la aplicación React en el nodo raíz.
// StrictMode ayuda a detectar efectos secundarios durante desarrollo.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
