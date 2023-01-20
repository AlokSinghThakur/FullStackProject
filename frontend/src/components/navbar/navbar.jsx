import React from "react";
import "./navbar.css";
const Navbar = () => {
    return (
        <div className="top" >
            <a className="left">Home</a>
           <div className="right">
            <a className="a">All Notes</a>
            <a className="a"> My Notes</a>
            </div> 
        </div>
    )
}
export default Navbar;