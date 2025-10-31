import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import "./Add_doctor.css";
import { toast } from "react-toastify";
import axios from "axios";
import { AdminContext } from "../../Context_Controller/AdminContext";
function AdminAddDoctor() {
  console.log("the add doctor page");
  const [doctorimage, setdocImg] = useState(false);
  // const[showpassword,setshowpassword]=useState(false);
  const [password, setpassword] = useState(false);
  const [formtype, setformtype] = useState({
    fullname: "",
    email: "", degree: "", password: "",
    address: { line1: "", line2: "" },
    speciality: "",
    // education: "",
    experience: "", fees: "", about: ""
  })
  function changehandler(event) {
    setformtype(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }

  const { backend_url, Atoken } = useContext(AdminContext);

  const submithandler = async (event) => {
    event.preventDefault();
    try {
      if (!doctorimage) {
        return toast.error("image not selected");
      }
      const formdata = new FormData();    //FormData is a contsructor
      formdata.append('myimage', doctorimage)
      formdata.append('fullname', formtype.fullname)
      formdata.append('email', formtype.email)
      formdata.append('degree', formtype.degree)
      formdata.append('password', formtype.password)
      formdata.append('speciality', formtype.speciality)
      formdata.append('experience',formtype.experience)
      formdata.append('fees', formtype.fees)
      formdata.append('line1', formtype.address.line1)
      formdata.append('line2', formtype.address.line2)
      formdata.append('about', formtype.about)

      formdata.forEach((value, key) => {
        console.log(`${key}`, `${value}`)
      })
      console.log("posting to:", backend_url + '/api/v1/doctor_info')
      const { data } = await axios.post(backend_url + '/api/v1/doctor_info',formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            atoken: Atoken
          }
        }
      )
      console.log("form data  is this", data);
      if(data.success){
        return toast.success("doctor added successfully")
      }
    } catch (error) {
      if(!data.success){
        return toast.error("connection problem is there");
      }
    }


  }
  return (
    <div className="add_doc_container">
      <h2 className="add_doc_heading">Add Doctor</h2>
      <form className="add_doc_form" onSubmit={submithandler}>
        <div className="doc_img_container">
          <label htmlFor="doc-img" >
            <img src={doctorimage ? (URL.createObjectURL(doctorimage)) : (assets.upload_area)} alt="add_doc_img" className="add_doc_img" />
          </label>
          <input
            type="file"
            id="doc-img"
            onChange={(event) => setdocImg(event.target.files[0])}
            hidden
          />
          {
            doctorimage === false ? (<p className="upload_doc_heading" >upload Doctor
              <br />Picture
            </p>) : (<></>)
          }

        </div>

        <div className="all_form_data_wrapper">
          <div className="all_form_data_container">
            <div className="form_left_side">
              <label htmlFor="doc_name" className="all_label">Doctor Name</label>
              <input
                type="text"
                placeholder="doctor_name"
                name="fullname"
                value={formtype.fullname}
                onChange={changehandler}
                required
              />

              <label htmlFor="doctor_email" className="all_label">Doctor Email</label>
              <input
                className="add_doc_input"
                type="email"
                placeholder="doctor_email"
                name="email"
                value={formtype.email}
                onChange={changehandler}
                required />

              <label htmlFor="setpassword" className="all_label">Set Password</label>
              <input
                className="add_doc_input"
                type={password ? "text" : "password"}
                placeholder="setPassword"
                name="password"
                value={formtype.password}
                onChange={changehandler}
                required
              />
              {
                password ? (<FaEyeSlash onClick={() => setpassword(!password)} className="doc_password" />) : (<FaEye onClick={() => setpassword(!password)} className="doc_password" />)
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
                  name="line1"
                  value={formtype.address.line1}
                  onChange={(e) =>
                    setformtype((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value }
                    }))
                  }
                />
                <br />
                <input
                  type="text"
                  placeholder="address 2"
                  name="line2"
                  value={formtype.address.line2}
                  onChange={(e) =>
                    setformtype((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value }
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
          name="about" value={formtype.about} required onChange={changehandler}
          placeholder="Write about Yourself">About Doctor</textarea>
        <button className="add_doc_btn">Add Doctor</button>
      </form>
    </div>
  )
};
export default AdminAddDoctor;