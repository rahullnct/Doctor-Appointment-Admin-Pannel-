import { useContext, useState } from "react"; 
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import './Login.css';
import axios from "axios";
import { AdminContext } from "../Context_Controller/AdminContext";
// import { toast } from "react-hot-toast";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DoctorContext } from "../Context_Controller/DoctorContext";
function Login()
{
    const {backend_url,setAtoken}=useContext(AdminContext);
    // const{setdtoken}=useContext(DoctorContext);
    console.log("backend_url",backend_url);

    const [loginsetup, setloginsetup] = useState({ email: "", password: "" }) 
    const [showpassword, setshowpassword] = useState(false);
    const [State,setState]=useState('Admin');
    function changehandler(event) 
    {
     setloginsetup((prev) =>
         ({ ...prev,
             [event.target.name]: event.target.value })) 
    } 
    const submithandler= async(event)=>{
        event.preventDefault();
        try{
          const {email,password}=loginsetup;
        if(State === 'Admin'){
            const {data}= await axios.post(backend_url + '/api/v1/admin/login',{email,password})
            // console.log("data",data);
            if(data.success){
                console.log(data.admin_token);
                toast.success("welcome to admin page")
            localStorage.setItem('aToken',data.admin_token)
            setAtoken(data.admin_token);
            }
        }else{
           const{data}=await axios.post(backend_url+'/api/v1/doctor/login',{email,password})
           console.log("doctor data",data);
        }
    }
       catch(error){
           if (error.response) {
        toast.error(error.response.data.message || "Invalid credentials!");
      } else {
        toast.error("Something went wrong. Try again later.");
      }
        }
       
    }
    return (
    <div className="login_wrapper">
        <div className="login_container">
            <div className="login_left">
                <h1 className="login_heading">Welcome Back to {State} Portal</h1> 
                <p className="login_subheading">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur fugiat ea libero a magnam! Porro officia ratione quia autem quis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, deserunt.</p>
                </div>
                <form onSubmit={submithandler} className="login_form">
                <label htmlFor="email" className="for_username">Username Or Email</label>
                <input className="inp_username" 
                type="email"
                name="email" 
                value={loginsetup.email}
                onChange={changehandler}
                required />
                <label htmlFor="password" className="for_password">Password</label> 
                <input className="inp_password"
                type={showpassword ? "text" : "password"} 
                name="password" 
                value={loginsetup.password} 
                onChange={changehandler}
                required />
                {
                 showpassword ? (<FaEye onClick={() => setshowpassword(!showpassword)} className="show_icon" />) :
                  (<FaEyeSlash onClick={() => setshowpassword(!showpassword)} className="show_icon" />)
                }
                <Link to='/forgot_password' className="forgot_password">Forgotten password</Link> 
                <button className="login_btn">Login</button> 
                 <p>Go to 
                 {
                    State === 'Admin'? (<span onClick={()=>setState('Doctor')}>Doctor</span>) : (<span onClick={()=>setState('Admin')}>Admin</span>)
                 }
                 </p>
                </form> 
                </div> 
                </div>);
} 
                export default Login;