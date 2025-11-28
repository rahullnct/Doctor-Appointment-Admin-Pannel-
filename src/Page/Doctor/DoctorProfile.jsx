import { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../Context_Controller/DoctorContext";
import { AdminContext } from "../../Context_Controller/AdminContext";
import axios from "axios";
import "./DoctorProfile.css";


function DoctorProfile() {
    const { doctorprofile, dtoken, docProfile, setdocProfile, backend_url } = useContext(DoctorContext);
    const { currency } = useContext(AdminContext);
    const [edit, setedit] = useState(false);
    // console.log("docProfile:", docProfile);


    const docProfileUpdate = async () => {
        try {
            const formdata = {
                fees: docProfile?.fees,
                address:docProfile?.address,
                available:docProfile?.available,
            }

            const { data } = await axios.post(backend_url + '/api/v1/doctor/update/doctor-profile', formdata , {
                headers: {
                    dtoken: dtoken,
                    'Content-Type': 'multipart/form-data'
                }
            })

            if (data.success) {
                await doctorprofile();
                setedit(false);
                console.log("updated data is saved")
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (dtoken) {
            doctorprofile();
        } else {
            setdocProfile(false);
        }
    }, [dtoken])



    return docProfile && (
        <div className="doctor_profile_container">
            <img src={`http://localhost:4000${docProfile?.myimage}`} alt="doctor pannel profile image" />
            <div className="doc_Details">
                <h1 className="docName">{docProfile.fullname}</h1>
                <div className="doc_academic">
                    <p className="degree">{docProfile?.degree}</p>
                    <p className="speciality">{docProfile?.speciality}</p>
                    <p className="experience">{docProfile?.experience}</p>
                </div>
                <h2 className="about_heading">About</h2>
                <p className="doc_about">{docProfile?.about}</p>
                <p className="doctor_appointment">Appointment Fees:
                    {
                        edit ? <input
                            type="number"
                            value={docProfile.fees}
                            onChange={event => setdocProfile(prev => ({
                                ...prev,
                                fees: event.target.value
                            }))}
                        /> : (<span className="docFees">{currency}{docProfile.fees}</span>)
                    }
                </p>

                <p className="docAddress">Address:
                    {edit ? (<div className="changed_values">
                        <input
                            className="address_value"
                            type="text"
                            value={docProfile?.address?.line1}
                            onChange={(event) => setdocProfile(prev => ({
                                ...prev,
                                address: { ...prev.address, line1: event.target.value }
                            }))}
                        />
                        <br />
                        <input
                            className="address_value"
                            type="text"
                            value={docProfile?.address?.line2}
                            onChange={(event) => setdocProfile(prev => ({
                                ...prev,
                                address: {
                                    ...prev.address,
                                    line2: event.target.value
                                }
                            }))}
                        />
                    </div>) :
                        (<div className="main_address">
                            <span className="address1">{docProfile?.address?.line1}</span>
                            <br/>
                            <span className="address2">{docProfile?.address?.line2}</span>
                        </div>)
                    }
                </p>
                <p>Phone: {edit ? (<input
                    type="text"
                    value={docProfile.phone}
                    onChange={(event) => setdocProfile((prev) => ({
                        ...prev,
                        phone: event.target.value
                    }))}
                />) : (<span className="default_value">{docProfile?.phone}</span>)}</p>
                <div className="available_or_not">
                    <input

                        type="checkbox"
                        name=""
                        id=""
                        onChange={() => edit && setdocProfile(prev => ({
                            ...prev,
                            available: !prev.available
                        }))}
                        checked={docProfile?.available}
                    />
                    <label className="doc_available">Available</label>
                </div>
                {
                    edit ? <button onClick={() => docProfileUpdate()} className="save_btn">Save</button> : (<button onClick={() => setedit(true)} className="edit_btn">Edit</button>)
                }
            </div>
        </div>
    )
};
export default DoctorProfile;