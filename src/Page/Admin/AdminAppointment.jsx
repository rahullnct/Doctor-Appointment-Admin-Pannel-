import { useContext, useEffect } from "react";
import { AdminContext } from "../../Context_Controller/AdminContext";

function AdminAppointment(){
    const {Atoken,getappointments,appointments}=useContext(AdminContext);
    // console.log(appointments);

    useEffect(()=>{
    if(Atoken){
        getappointments();
    }
    },[Atoken])
    return(
        <h1>Admin Appointment</h1>
    )
};
export default AdminAppointment;