import { createContext, useState } from "react";


export const DoctorContext=createContext();

const  Doctorprovider=(props)=>{

   const backend_url=import.meta.env.VITE_BACKEND_URL;

   const[dtoken,setdtoken]=useState(localStorage.getItem('dtoken') ? localStorage.getItem('dtoken'):'');
   console.log("doctor token",dtoken);
   const value={
      dtoken,
      setdtoken,
      backend_url,
   }
 
   return <DoctorContext.Provider value={value}>
    {props.children}
   </DoctorContext.Provider>
}
export default Doctorprovider;