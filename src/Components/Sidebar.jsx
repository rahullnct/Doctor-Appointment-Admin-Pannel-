import { useNavigate, Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AdminContext } from "../Context_Controller/AdminContext";
import { MdSpaceDashboard } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { MdOutlineAddBox } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";
import './Sidebar.css';
import { DoctorContext } from "../Context_Controller/DoctorContext";
function Sidebar() {
    const { Atoken } = useContext(AdminContext);
    const { dtoken } = useContext(DoctorContext);
    const location = useLocation();
    // const[activestate,useactivestate]=useState(0);

    // const clickhandler=(index)=>{
    //     useactivestate(index);
    // }

    return (

        <aside className="sidebar_wrapper">
            {Atoken &&
                <ul className="sidebar_container">
                    <div className={`icons_with_contents ${location.pathname === '/admin-dashboard' ? "active" : ""}`}
                    // onClick={()=>clickhandler(0)}
                    >
                        <MdSpaceDashboard className="icons" />
                        <li className="sidebar_contents"><Link to='/admin-dashboard'>Admin Dashboard</Link></li>
                    </div>
                    <div className={`icons_with_contents ${location.pathname === '/admin-appointment' ? "active" : ""}`}
                    // onClick={()=>clickhandler(1)}
                    >
                        <SlCalender className="icons" />
                        <li className="sidebar_contents"><Link to='/admin-appointment'>Admin Appointment</Link></li>
                    </div>
                    <div className={`icons_with_contents ${location.pathname === '/add-doctor' ? "active" : ""}`}
                    //  onClick={()=>clickhandler(2)}
                    >
                        <MdOutlineAddBox className="icons" />
                        <li className="sidebar_contents"><Link to='/add-doctor'>Add Doctor</Link></li>
                    </div>
                    <div className={`icons_with_contents ${location.pathname === '/doctor-list' ? "active" : ""}`}
                    //  onClick={()=>clickhandler(3)}
                    >
                        <BsPeopleFill className="icons" />
                        <li className="sidebar_contents"><Link to='/doctor-list'>Doctor List</Link></li>
                    </div>

                </ul>
            }

            {dtoken &&
                <ul className="sidebar_container">
                    <div className={`icons_with_contents ${location.pathname === '/doctor-dashboard' ? "active" : ""}`}
                    // onClick={()=>clickhandler(0)}
                    >
                        <MdSpaceDashboard className="icons" />
                        <li className="sidebar_contents"><Link to='/doctor-dashboard'>Doctor Dashboard</Link></li>
                    </div>
                    <div className={`icons_with_contents ${location.pathname === '/doctor-appointment' ? "active" : ""}`}
                    // onClick={()=>clickhandler(1)}
                    >
                        <SlCalender className="icons" />
                        <li className="sidebar_contents"><Link to='/doctor-appointment'>Doctor Appointment</Link></li>
                    </div>
                    {/* <div className={`icons_with_contents ${location.pathname === '/add-doctor' ? "active" : ""}`}
                    //  onClick={()=>clickhandler(2)}
                    >
                        <MdOutlineAddBox className="icons" />
                        <li className="sidebar_contents"><Link to='/add-doctor'>Add Doctor</Link></li>
                    </div> */}
                    <div className={`icons_with_contents ${location.pathname === '/doctor-profile' ? "active" : ""}`}
                    //  onClick={()=>clickhandler(3)}
                    >
                        <BsPeopleFill className="icons" />
                        <li className="sidebar_contents"><Link to='/doctor-profile'>Doctor Profile</Link></li>
                    </div>

                </ul>
            }

        </aside>
    )
};
export default Sidebar;


