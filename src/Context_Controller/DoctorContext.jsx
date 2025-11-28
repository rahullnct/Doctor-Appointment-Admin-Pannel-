import { createContext, useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";

export const DoctorContext=createContext();

const  Doctorprovider=(props)=>{

   const backend_url=import.meta.env.VITE_BACKEND_URL;
   const[dtoken,setdtoken]=useState(localStorage.getItem('dtoken') ? localStorage.getItem('dtoken'):'');
   
   const[appointment,setappointments]=useState([]);
   const[docProfile,setdocProfile]=useState([]);

   

   
   const getappointment=async()=>{
      try{
          const{data}=await axios.get(backend_url+'/api/v1/doctor/appointment',{headers:{dtoken:dtoken}})
          console.log("doctor pannel appointment",data);
         if(data.success){
            setappointments(data.appointment);            
         }
      }catch(error){
         console.log(error);
      }
   }
  
   const appointmentComplete=async(appointmentId)=>{
      try{
          const{data}=await axios.post(backend_url+'/api/v1/doctor/appointment/Complete',{appointmentId},{headers:{
            dtoken:dtoken
          }})
          if(data.success){
            console.log(data.message);
            getappointment();

          }
      }
      catch(error){
         console.log("appointment not complete",error);
      }
   }
   const appointmentCancel=async(appointmentId)=>{
      try{
         const {data}=await axios.post(backend_url+'/api/v1/doctor/appointment/cancel',{appointmentId},{headers:{
            dtoken:dtoken
         }})
         if(data.success){
            console.log(data.message);
            getappointment();
         }
      }
      catch(error){
         console.log("appointment not complete",error);
      }

   } 
   const doctorprofile=async()=>{
      try{
         const {data}=await axios.get(backend_url+'/api/v1/doctor/profile',{headers:{
            dtoken:dtoken
         }})
         // console.log("doctor profile data:",data);
         if(data.success){
            setdocProfile(data?.profile)
         }
      }catch(error){
        console.log("doctor profile error",error);  
      }
   }
  
   const value={
      dtoken,
      setdtoken,
      backend_url,
      appointment,
      setappointments,
      getappointment,
      appointmentComplete,
      appointmentCancel,
      doctorprofile,
      docProfile,
      setdocProfile,

   }
 
   return <DoctorContext.Provider value={value}>
    {props.children}
   </DoctorContext.Provider>
}
export default Doctorprovider;