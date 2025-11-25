import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../Context_Controller/AdminContext";
import {DoctorContext} from "../Context_Controller/DoctorContext";
import './Navbar.css';

function Navbar(){
    const{Atoken,setAtoken}=useContext(AdminContext);
    const{dtoken,setdtoken}=useContext(DoctorContext);

    const checkToken=()=>{
        Atoken && setAtoken('');
        Atoken && localStorage.removeItem('aToken');
    }
    const checkdtoken=()=>{
        dtoken && setdtoken('');
        dtoken && localStorage.removeItem('dtoken');
    }
    return(
        <div className="navbar_container">
            <nav className="navbar_st">
                <div className="logo_adm_doc">
                <h1 className="logo">Logo</h1>
                <span className="adm_doc">
                    {
                        Atoken ? "Admin" : "Doctor"
                    }
                </span>
                </div>
                {
                    Atoken ? <button className="admin_btn" onClick={checkToken}>Logout</button> : (<button className="admin_btn" onClick={checkdtoken}>Logout</button> )
                }
                
            </nav>
        </div>
    )
};
export default Navbar;