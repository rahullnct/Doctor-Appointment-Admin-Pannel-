import { useState } from "react";
import { assets } from "../../assets/assets";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import "./Add_doctor.css";
function AdminAddDoctor() {
  console.log("the add doctor page");
  const[docImg,setdocImg]=useState(false);
  // const[showpassword,setshowpassword]=useState(false);
  const[password,setpassword]=useState(false);
  const [formtype, setformtype] = useState({
    doc_name: "",
    doc_email: "", degree: "", setpassword: "",
    address: { adress1: "", adress2: "" },
    speciality: "", education: "",
    experience: "", fees: "", about_doc: ""
  })
  function changehandler(event) {
    setformtype(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }
  return (
    <div className="add_doc_container">
      <h2 className="add_doc_heading">Add Doctor</h2>
      <form className="add_doc_form">
        <div className="doc_img_container">
          <label htmlFor="doc-img" >
            <img src={ docImg ? (URL.createObjectURL(docImg)):(assets.upload_area)} alt="add_doc_img" className="add_doc_img" />
          </label>
          <input
            type="file"
            id="doc-img"
            onChange={(event)=>setdocImg(event.target.files[0])}
            hidden
            required
          />
          {
            docImg === false ? ( <p className="upload_doc_heading" >upload Doctor
            <br />Picture
          </p>):(<></>)
          }
         
        </div>

        <div className="all_form_data_wrapper">
          <div className="all_form_data_container">
            <div className="form_left_side">
              <label htmlFor="doc_name" className="all_label">Doctor Name</label>
              <input
                type="text"
                placeholder="doctor_name"
                name="doc_name"
                value={formtype.doc_name}
                onChange={changehandler}
                required
              />

              <label htmlFor="doctor_email" className="all_label">Doctor Email</label>
              <input
                className="add_doc_input"
                type="email"
                placeholder="doctor_email"
                name="doc_email"
                value={formtype.doc_email}
                onChange={changehandler}
                required />

              <label htmlFor="setpassword" className="all_label">Set Password</label>
              <input
                className="add_doc_input"
                type={password ? "text" :"password"}
                placeholder="setPassword"
                name="setpassword"
                value={formtype.setpassword}
                onChange={changehandler}
                required
              />
              {
                password ? (<FaEyeSlash onClick={()=>setpassword(!password)} className="doc_password"/>):(<FaEye onClick={()=> setpassword(!password)} className="doc_password"/>)
              }

              <label htmlFor="experience" className="all_label">Experience</label>
              <input type="text"
                className="add_doc_input"
                placeholder="Experience"
                name="experience"
                value={formtype.experience}
                onChange={changehandler}
                required />

              <label htmlFor="fees" className="all_label">Fees</label>
              <input type="text"
                className="add_doc_input"
                placeholder="fees"
                name="fees"
                value={formtype.fees}
                onChange={changehandler}
                required />
            </div>
            <div className="form_right_side">
              <label htmlFor="speciality" className="all_label">Speciality</label>
              <input
                type="text"
                placeholder="Enter Speciality"
                name="speciality"
                value={formtype.speciality}
                onChange={changehandler}
                required
              />

              <label htmlFor="doctor_degree" className="all_label">Degree</label>
              <input
                className="add_doc_input"
                type="text"
                placeholder="degree"
                name="degree"
                value={formtype.degree}
                onChange={changehandler}
                required
              />
              <div className="doctor_address">
                <label htmlFor="address" className="all_label">Address 1</label>
                <input
                  type="text"
                  placeholder="address 1"
                  name="address1"
                  value={formtype.address.address1}
                  onChange={(e) =>
                    setformtype((prev) => ({
                      ...prev,
                      address: { ...prev.address, address1: e.target.value }
                    }))
                  }
                />
                <br />
                <input
                  type="text"
                  placeholder="address 2"
                  name="address2"
                  value={formtype.address.address2}
                  onChange={(e) =>
                    setformtype((prev) => ({
                      ...prev,
                      address: { ...prev.address, address2: e.target.value }
                    }))
                  }
                />
              </div>

            </div>
          </div>
        </div>
        <label htmlFor="about" className="all_label">About</label>
        <textarea
          className="textarea_inp"
          name="about_doc" value={formtype.about_doc} required onChange={changehandler}
          placeholder="Write about Yourself">About Doctor</textarea>
        <button className="add_doc_btn">Add Doctor</button>
      </form>
    </div>
  )
};
export default AdminAddDoctor;