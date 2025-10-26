import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AdminProvider from './Context_Controller/AdminContext.jsx'
import Doctorprovider from './Context_Controller/DoctorContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import AppContextprovider from './Context_Controller/AppContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     <AdminProvider>
     <Doctorprovider>
      <AppContextprovider>
        <App /> 
      </AppContextprovider>
     </Doctorprovider>
    </AdminProvider>
    </BrowserRouter>
   
  </StrictMode>,
)
