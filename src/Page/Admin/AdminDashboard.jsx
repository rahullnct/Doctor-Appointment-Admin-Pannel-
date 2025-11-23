import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../Context_Controller/AdminContext";
import axios from "axios";

function AdminDashboard(){
    const {Atoken,backend_url}=useContext(AdminContext);
   const[dashboard_details,setdashboard_details]=useState(false);
    const dashboardDetails=async()=>{
        try{
            const {data}=await axios.get(backend_url+'/api/v1/admin/dashboard',{headers:{
                atoken:Atoken
            }})
            console.log("dashboard datas are here:",data)
            if(data.success){
                setdashboard_details(data.dashdata);
            }
            else{
                console.log(data.message);
            }
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
    if(Atoken){
        dashboardDetails();
    }
    },[Atoken])
    return(
        <h1>total users{
        dashboard_details.users
        }</h1>
    )
};
export default AdminDashboard;