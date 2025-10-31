import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../Context_Controller/AdminContext";
import Loader from "../../Components/Loader";
import "./Doctor_list.css";

function DoctorList(){
     const { alldoctor_data, alldoctors,Atoken,check_availablity } = useContext(AdminContext);
     const[doctor_img,setdoctor_img]=useState([]);
    
  useEffect(() => {
    alldoctors();   
  }, [Atoken]);

  useEffect(()=>{
     setdoctor_img(alldoctor_data);
  },[alldoctor_data])

  
    return(
      <div className="doctor_list_wrapper">
         <h1 className="doctor_list_heading">All Doctors</h1>
         <div className="all_doctors_container">
          {
          doctor_img.length > 0 ? (
          doctor_img.map((doctor_data)=>(
            <div className="doctor_information">
            <img 
            key={doctor_data._id}
            src={`http://localhost:4000${doctor_data.myimage}`} 
            alt="doctor_images"
            className="all_doctor_image"
             />
             <p className="doc_name">{doctor_data.fullname}</p>
             <p className="speciality">{doctor_data.speciality}</p>
             <div className="doc_available">
              <input type="checkbox" onChange={()=> check_availablity(doctor_data._id)}  checked={doctor_data.available} />
              <span className="available">Available</span>
              </div>
             
             </div>

          ))
        ):(<Loader/>)
        }
         </div>
        
      </div>
       
    )
};
export default DoctorList;