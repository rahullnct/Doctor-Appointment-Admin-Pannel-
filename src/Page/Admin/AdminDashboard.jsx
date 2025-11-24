import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../Context_Controller/AdminContext";
import axios from "axios";
import { assets } from "../../assets/assets";
import { AppContext } from "../../Context_Controller/AppContext";
import { MdCancel } from "react-icons/md";
import "./AdminDashboard.css";

function AdminDashboard() {
    const { Atoken, backend_url,admin_appointment_cancel } = useContext(AdminContext);
    const { ChangeDates } = useContext(AppContext);
    const [dashboard_details, setdashboard_details] = useState(false);
    const [latest_appointment, setlatest_appointment] = useState([]);
    const dashboardDetails = async () => {
        try {
            const { data } = await axios.get(backend_url + '/api/v1/admin/dashboard', {
                headers: {
                    atoken: Atoken
                }
            })
            if (data.success) {
                setdashboard_details(data.dashdata);
            }
            else {
                console.log(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (Atoken) {
            dashboardDetails();
        }
    }, [Atoken])

    useEffect(() => {
        if (dashboard_details) {
            setlatest_appointment(dashboard_details.latest_appointment);
        }
    }, [dashboard_details])

    return (
        <div className="admin_dashboard_container">
            <div className="dashboard_details">
                <div className="doctor_count">
                    <img src={assets.doctor_icon} alt="doctor_icon" />
                    <div className="admin_doctor_details">
                        <h4>{dashboard_details.doctors}</h4>
                        <p className="doctors">Doctors</p>
                    </div>
                </div>
                <div className="appointment_count">
                    <img src={assets.appointment_icon} alt="appointment_icon" />
                    <div className="admin_doctor_details">
                        <h4>{dashboard_details.appointments}</h4>
                        <p className="admin_appointments">Appointments</p>
                    </div>
                </div>
                <div className="doctor_count">
                    <img src={assets.patients_icon} alt="doctor_icon" />
                    <div className="admin_doctor_details">
                        <h4>{dashboard_details.users}</h4>
                        <p className="Patients">Patients</p>
                    </div>
                </div>
            </div>

            <div className="latest_appointment_details">
                <div className="heading_booking">
                    <img src={assets.list_icon} alt="dashboard_list_icon" />
                    <h3 className="latest_booking_heading">latest Booking</h3>
                </div>
                {
                    latest_appointment.map((app_details, index) => (
                        <div key={index} className="dashboard_doc_details">
                            <div className="doc_details">
                            <img src={`http://localhost:4000${app_details?.docData?.myimage}`} alt="admin_dashboard_doc_img" />
                            <div className="doc_name_date">
                            <h3 className="doc_name">{app_details?.docData?.fullname}</h3>
                            <p>Booking on {ChangeDates(app_details?.slotDate)}</p>
                            </div>
                            </div>
                            {
                                app_details.cancelled ? <p>Cancelled</p> :
                                    (<MdCancel onClick={() => admin_appointment_cancel(app_details._id)} />)
                            }
                        </div>

                    ))
                }

            </div>
        </div>
    )
};
export default AdminDashboard;
