// import { useContext, useEffect } from "react";
// import { DoctorContext } from "../../Context_Controller/DoctorContext";
// import { AppContext } from "../../Context_Controller/AppContext";
// import Loader from "../Loader";
// import { MdCancel } from "react-icons/md";
// import { AdminContext } from "../../Context_Controller/AdminContext";
// function DoctorAppointment(){
//     const{dtoken,getappointment,appointment}=useContext(DoctorContext);
//     const { calculate_age, ChangeDates } = useContext(AppContext);
//     const{currency}=useContext(AdminContext);
//     useEffect(()=>{
//     if(dtoken){
//         getappointment();
//     }

//     },[dtoken])
//       return (
//             <div className="admin_appointment_container">
//                 <table className="appointment_table">
//                     <thead className="all_table_head">
//                         <tr className="appointment_rows">
//                             <th className="column_names">S.No.</th>
//                             <th className="column_names">Patient</th>
//                             <th className="column_names">Age</th>
//                             <th className="column_names">Date & Time</th>
//                             <th className="column_names">Doctor</th>
//                             <th className="column_names">Fees</th>
//                             <th className="column_names">Action</th>
//                         </tr>
//                     </thead>
//                     <tbody className="all_table_bodies">
//                         {
//                             appointment.length > 0 ? (
    
//                                 appointment.map((user_datas, ind) => (
//                                     <tr key={user_datas._id}>
//                                         <td>{ind + 1}</td>
//                                         {/* <td>{user_datas?.userData?.fullname}</td> */}
//                                         {/* <td>{calculate_age(user_datas?.userData?.Dob) || ''}</td> */}
//                                         {/* <td>{ChangeDates(user_datas?.slotDate)},{user_datas?.slotTime}</td> */}
//                                         <td>
//                                             <img src={`http://localhost:4000${user_datas?.docData?.myimage}`} alt="admin_appointment_doctor_image" />
//                                             {user_datas?.docData?.fullname}
//                                         </td>
//                                         <td>{currency}{user_datas?.docData?.fees}</td>
//                                         <td>
//                                             {
//                                                 user_datas.cancelled ? <p>Cancelled</p> :
//                                                     (<MdCancel onClick={()=> admin_appointment_cancel(user_datas._id)}/>)
//                                             }
//                                         </td>
    
//                                     </tr>
//                                 ))
//                             ) :
//                                 (
//                                     <tr>
//                                         <Loader />
//                                     </tr>
//                                 )
//                         }
//                     </tbody>
    
    
    
    
//                 </table>
    
//             </div>
//         )
// };
// export default DoctorAppointment;