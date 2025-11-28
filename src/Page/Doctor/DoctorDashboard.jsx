import { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../Context_Controller/DoctorContext";
import { assets } from "../../assets/assets";
import axios from "axios";
import { MdCancel } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { AppContext } from "../../Context_Controller/AppContext";
function DoctorDashboard() {
    const { dtoken, backend_url,appointmentCancel,appointmentComplete} = useContext(DoctorContext);
    const { ChangeDates } = useContext(AppContext);
    const [doc_dashboard, setdoc_dashboard] = useState(false);
    // console.log("dashboard_Details:", doc_dashboard);
    const [latest_appointment, setlatest_appointment] = useState([]);

    const DoctorDashboard = async () => {
        try {
            const { data } = await axios.get(backend_url + '/api/v1/doctor/dashboard', {
                headers: {
                    dtoken: dtoken
                }
            })
            console.log("doctor dashboard data:", data)
            if (data.success) {
                setdoc_dashboard(data.dashData)
            }
        }
        catch (error) {
            console.log("doctor dashboard not complete", error);
        }
    }
    useEffect(() => {
        if (dtoken) {
            DoctorDashboard();
        }
    }, [dtoken])

    useEffect(() => {
        if (doc_dashboard) {
            setlatest_appointment(doc_dashboard?.latest_appointment)
        }
    }, [doc_dashboard])

    return (
        <div className="admin_dashboard_container">
            <div className="dashboard_details">
                <div className="doctor_count">
                    <img src={assets.appointment_icon} alt="appointment_icon" />
                    <div className="admin_doctor_details">
                        <h4>{doc_dashboard.appointment}</h4>
                        <p className="doctors">Appointments</p>
                    </div>
                </div>
                <div className="appointment_count">
                    <img src={assets.appointment_icon} alt="appointment_icon" />
                    <div className="admin_doctor_details">
                        <h4>{doc_dashboard.collected_money}</h4>
                        <p className="admin_appointments">Collected Money</p>
                    </div>
                </div>
                <div className="doctor_count">
                    <img src={assets.patients_icon} alt="doctor_icon" />
                    <div className="admin_doctor_details">
                        <h4>{doc_dashboard.patients}</h4>
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
                                {/* <img src={`http://localhost:4000${app_details?.docData?.myimage}`} alt="admin_dashboard_doc_img" /> */}
                                <div className="doc_name_date">
                                    <h3 className="doc_name">{app_details?.userData?.fullname}</h3>
                                    <p>Booking on {ChangeDates(app_details?.slotDate)}</p>
                                </div>
                            </div>
                            {
                                app_details?.cancelled ? (<p>Cancelled</p>) :
                                    (app_details?.IsCompleted ? (<p style={{ color: "green" }}>Completed</p>) : (
                                        <div style={{ gap: "10px" }}>
                                            <TiTick style={{ color: "green" }} onClick={() => appointmentComplete(app_details?._id)} />
                                            <MdCancel onClick={() => appointmentCancel(app_details?._id)} />
                                        </div>
                                    ))
                            }
                        </div>

                    ))
                }

            </div>
        </div>
    )
};
export default DoctorDashboard;