import axios from "axios";
import { useState, createContext } from "react";
export const AdminContext = createContext();

const AdminProvider = (props) => {

  const [Atoken, setAtoken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken'):('') );
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const[alldoctor_data,setalldoctorData]=useState([]);
  const[appointments,setappointments]=useState([]);
  const currency='$';


  const alldoctors=async()=>{
     try{
        const {data}= await axios.post(backend_url+'/api/v1/all-doctors',{},
          {headers:{
          atoken:Atoken
        }})
        console.log("all doctors data:",data.data)
     if(data.success){
      setalldoctorData(data.data);
     }
      console.log(data);

     }catch(error){
      console.log(error);
     }
  }

  const check_availablity=async(docId)=>{
    try{
       const {data}= await axios.post(backend_url+'/api/v1/availability',{docId},{headers:{
        atoken: Atoken
       }})
       if(data.success){
        console.log("availablity is checked");
        alldoctors();
      }else{
        console.log(data.message);
      }
    }
    catch(error){
      console.log(error);
    }
  }
  const getappointments=async()=>{
    try{
      const {data}=await axios.get(backend_url+'/api/v1/admin/appointments',{headers:{atoken:Atoken}});
      console.log("admin appointments details:",data);
      if(data.success){
      setappointments(data.appointment_data);
      }else{
      console.log(data.message);
      }
    }
      catch(error){
        console.log(error);
      }
    }

const admin_appointment_cancel=async(appointment_id)=>{
  try{
     const {data}=await axios.post(backend_url+'/api/v1/admin/appointment_cancel',{appointment_id},{headers:{
      atoken:Atoken
  }})
     console.log("appointment cancel:",data);
  }catch(err){
      console.log(err);

  }
}

  const value = {
    Atoken,
    setAtoken,
    backend_url,
    alldoctor_data,
    setalldoctorData,
    alldoctors,
    check_availablity,
    getappointments,
    appointments,
    setappointments,
    currency,
    admin_appointment_cancel,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
