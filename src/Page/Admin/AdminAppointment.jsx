import { useContext, useEffect } from "react";
import { AdminContext } from "../../Context_Controller/AdminContext";
import Loader from "../Loader";
function AdminAppointment(){
    const {Atoken,getappointments,appointments}=useContext(AdminContext);
    // console.log(appointments);

    useEffect(()=>{
    if(Atoken){
        getappointments();
    }
    },[Atoken])
    return(
        <div className="admin_appointment_container">
            <table className="appointment_table">
                <thead>
                   <tr className="appointment_rows">
                <th className="column_names">S.No.</th>
                <th className="column_names">Patient</th>
                <th className="column_names">Age</th>
                <th className="column_names">Date & Time</th>
                <th className="column_names">Doctor</th>
                <th className="column_names">Fees</th>
                <th className="column_names">Action</th>
             </tr> 
                </thead>
                <tbody>
                   {
                appointments.length > 0 ? (

                    appointments.map((user_datas,ind)=>(
                        <tr key={user_datas._id}>
                            <td>{ind+1}</td>
                            <td>{user_datas?.userData?.fullname}</td>
                            <td>{user_datas?.age || ''}</td>
                            <td>{user_datas?.slotDate} {user_datas?.slotTime}</td>
                            <td>{user_datas?.docData?.fullname}</td>
                            <td>{user_datas?.docData?.fees}</td>
                            
                            
                        </tr>
                    ))
                ):
                (
                    <tr>
                       <Loader/> 
                    </tr>
                
            ) 
              } 
                </tbody>
                  
             

            
            </table>

        </div>
    )
};
export default AdminAppointment;