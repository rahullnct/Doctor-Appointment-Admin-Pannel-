import { createContext } from "react";


export const DoctorContext=createContext();

const  Doctorprovider=(props)=>{

   const value={

   }
 
   return <DoctorContext.Provider value={value}>
    {props.children}
   </DoctorContext.Provider>
}
export default Doctorprovider;