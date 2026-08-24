import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'

import { AuthProvider } from './contexts/AuthContext.jsx'

import App from './App.jsx'

import './styles/global.css'
import './styles/variables.css'
import './styles/forms.css'


//"achando" a div de id - root e entrega o controle dela pro react  
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <App />
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
