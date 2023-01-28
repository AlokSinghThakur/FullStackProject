import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();
    function logout(e){
        e.preventDefault();
        axios.get("http://localhost:5000/logout",{ withCredentials: true }).then(
            (response)=>{if(response.status===200){
                 document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                navigate("/login")
                console.log('login')
                }}
        ).catch((err)=>{
            alert("try again")
        })
    }
    return (
        <div className="top" >
            <a className="left">Home</a>
           <div className="right">
            <a className="a">All Notes</a>
            <a className="a"> My Notes</a>
            <a className="a">Login/Signup</a>
            <a className="a" onClick={logout}>Logout</a>
            </div> 
        </div>
    )
}
export default Navbar;