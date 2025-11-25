import { useContext, useEffect } from "react";
import { AdminContext } from "../../Context_Controller/AdminContext";
import Loader from "../Loader";
import { AppContext } from "../../Context_Controller/AppContext";
import { MdCancel } from "react-icons/md";
import "./AdminAppointment.css";
function AdminAppointment() {
    const { Atoken, getappointments, appointments, currency,admin_appointment_cancel } = useContext(AdminContext);
    console.log("appointment data",appointments);
    const { calculate_age, ChangeDates } = useContext(AppContext);

    useEffect(() => {
        if (Atoken) {
            getappointments();
        }
    }, [Atoken])
    return (
        <div className="admin_appointment_container">
            <table className="appointment_table">
                <thead className="all_table_head">
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
                <tbody className="all_table_bodies">
                    {
                        appointments.length > 0 ? (

                            appointments.map((user_datas, ind) => (
                                <tr key={user_datas._id}>
                                    <td>{ind + 1}</td>
                                    <td>{user_datas?.userData?.fullname}</td>
                                    <td>{calculate_age(user_datas?.userData?.Dob) || ''}</td>
                                    <td>{ChangeDates(user_datas?.slotDate)},{user_datas?.slotTime}</td>
                                    <td>
                                        <img src={`http://localhost:4000${user_datas?.docData?.myimage}`} alt="admin_appointment_doctor_image" />
                                        {user_datas?.docData?.fullname}
                                    </td>
                                    <td>{currency}{user_datas?.docData?.fees}</td>
                                    <td>
                                        {
                                            user_datas.cancelled ? <p>Cancelled</p> :
                                                (<MdCancel onClick={()=> admin_appointment_cancel(user_datas._id)}/>)
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
export default AdminAppointment;