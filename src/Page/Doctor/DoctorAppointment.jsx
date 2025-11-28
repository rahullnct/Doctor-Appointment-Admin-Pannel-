import { useContext, useEffect } from "react";
import { DoctorContext } from "../../Context_Controller/DoctorContext";
import { AppContext } from "../../Context_Controller/AppContext";
import Loader from "../Loader";
import { MdCancel } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { AdminContext } from "../../Context_Controller/AdminContext";
function DoctorAppointment(){
    const{dtoken,getappointment,appointment,appointmentComplete,appointmentCancel}=useContext(DoctorContext);
    const { calculate_age, ChangeDates } = useContext(AppContext);
    const{currency}=useContext(AdminContext);
    useEffect(()=>{
    if(dtoken){
        getappointment();
    }
    

    },[dtoken])
      return (
            <div className="admin_appointment_container">
                <table className="appointment_table">
                    <thead className="all_table_head">
                        <tr className="appointment_rows">
                            <th className="column_names">S.No.</th>
                            <th className="column_names">Patient</th>
                            <th className="column_names">Payment</th>
                            <th className="column_names">Age</th>
                            <th className="column_names">Date & Time</th>
                            <th className="column_names">Fees</th>
                            <th className="column_names">Action</th>
                        </tr>
                    </thead>
                    <tbody className="all_table_bodies">
                        {
                            appointment.length > 0 ? (
    
                                appointment.reverse().map((user_datas, ind) => (
                                    
                                    <tr key={user_datas._id}>
                                        <td>{ind + 1}</td>
                                        
                                        <td>{user_datas?.userData?.fullname}</td>
                                        <td>Cash</td>
                                        <td>{calculate_age(user_datas?.userData?.Dob) || ''}</td>
                                        <td>{ChangeDates(user_datas?.slotDate)},{user_datas?.slotTime}</td>
                                        <td>{currency}{user_datas?.docData?.fees}</td>
                                        <td>
                                            {
                                                user_datas?.cancelled ? (<p>Cancelled</p>):
                                                (user_datas?.IsCompleted ? (<p style={{color:"green"}}>Completed</p>):(
                                                <td>
                                                   <TiTick style={{color:"green"}} onClick={()=>appointmentComplete(user_datas?._id)}/>
                                                  <MdCancel onClick={()=>appointmentCancel(user_datas?._id)}/>
                                                </td>
                                                ))
                                            }
                                         
                                        </td>
    
                                    </tr>
                                ))
                            ) :
                                (
                                    <tr>
                                        <Loader />
                                    </tr>
                                )
                        }
                    </tbody>
    
    
    
    
                </table>
    
            </div>
        )
};
export default DoctorAppointment;