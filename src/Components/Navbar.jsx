import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../Context_Controller/AdminContext";
import './Navbar.css';

function Navbar(){
    const{Atoken,setAtoken}=useContext(AdminContext);
    
    const checkToken=()=>{
        Atoken && setAtoken('');
        Atoken && localStorage.removeItem('aToken');
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
                <button className="admin_btn" onClick={checkToken}>Logout</button>
            </nav>
        </div>
    )
};
export default Navbar;