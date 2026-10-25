import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './figma.css'
import './styles/figma-screens.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
