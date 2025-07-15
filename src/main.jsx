import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ProductProvider } from '../context/productContext.jsx'
import { AuthProvider } from '../context/userContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <ProductProvider>
      
    <App />
    
    </ProductProvider>
    </AuthProvider>
  </StrictMode>,
)
