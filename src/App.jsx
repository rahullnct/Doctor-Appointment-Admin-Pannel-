import { useContext, useState } from 'react'
import './App.css'
import { AdminContext } from './Context_Controller/AdminContext'
import Login from './Page/Login'
 import { ToastContainer, toast } from 'react-toastify';
import Navbar from './Components/Navbar';
import { Route, Routes } from 'react-router-dom';
import DoctorDashboard from './Page/Doctor/DoctorDashboard';
import DoctorProfile from './Page/Doctor/DoctorProfile';
import DoctorAppointment from './Page/Doctor/DoctorAppointment';
import Sidebar from './Components/Sidebar';
import AdminDashboard from './Page/Admin/AdminDashboard';
import DoctorList from './Page/Admin/DoctorList';
import AdminAddDoctor from './Page/Admin/AdminAddDoctor';
import AdminAppointment from './Page/Admin/AdminAppointment';
import { DoctorContext } from './Context_Controller/DoctorContext';
function App() {
  
  const {Atoken}=useContext(AdminContext);
  const{dtoken}=useContext(DoctorContext);
  return Atoken || dtoken ? (
    <div className='main_appp'>
        <ToastContainer/>
        <Navbar />
        <div className='the_dashboards'>
          <Sidebar/>
           <Routes>
            <Route path='/' element={<></>}/>
            <Route path='/doctor-dashboard' element={<DoctorDashboard/>}/>
            <Route  path='/doctor-profile' element={<DoctorProfile/>}/>
            <Route path='/doctor-appointment' element={<DoctorAppointment/>}/>
            <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
            <Route path='/doctor-list' element={<DoctorList/>}/>
            <Route path='/add-doctor' element={<AdminAddDoctor/>}/>
            <Route path='/admin-appointment' element={<AdminAppointment/>}/>
           </Routes>
        </div>
    </div>
  
  ):(
    <>
    <ToastContainer/>
    <Login/>
    </>
  )
}

export default App
