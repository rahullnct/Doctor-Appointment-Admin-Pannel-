import { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../Context_Controller/DoctorContext";

function DoctorProfile() {
    const { doctorprofile, dtoken, docProfile } = useContext(DoctorContext);
    const[edit,setedit]=useState(false);
    // console.log("docProfile:", docProfile);
    useEffect(() => {
        if (dtoken) {
            doctorprofile();
        }
    }, [dtoken])
    return docProfile && (
        <div className="doctor_profile_container">
            <img src={`http://localhost:4000${docProfile?.myimage}`} alt="doctor pannel profile image" />
            <div className="doc_Details">
                <h1>{docProfile.fullname}</h1>
                <div className="doc_academic">
                    <p className="degree">{docProfile?.degree}</p>
                    <p className="speciality">{docProfile?.speciality}</p>
                    <p className="experience">{docProfile?.experience}</p>
                </div>
                <h2 className="about_heading">About</h2>
                <p>{docProfile?.about}</p>
                <p className="doctor_appointment">Appointment Fees: <span className="docFees">{docProfile.fees}</span></p>
                <p className="docAddress">Address:
                    <span className="address1">{docProfile?.address?.line1}</span>
                    <span className="address2">{docProfile?.address?.line2}</span>
                </p>
                <p>Phone: {edit ? (<input 
                type="text"
                value={docProfile.phone}
                onChange={(event)=>event.target.value}
                />):(<span>{docProfile?.phone}</span>)}</p>
                <div>
                    {/* <input 
                    type="checkbox"
                    value={docProfile?.available}
                    onChange={()=>}
                    /> */}
                    <span>Available</span>
                </div>
                <button>Edit</button>
            </div>
        </div>
    )
};
export default DoctorProfile;