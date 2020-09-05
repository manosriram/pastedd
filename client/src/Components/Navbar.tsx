import React from "react";
import "../Styles/navbar.css";

function Navbar() {
    return (
        <div className="nav">
            <a href="/">Home</a>
            <a href="/">+Paste</a>
            <a href="/">Signin</a>
            <a href="/signup/">Signup</a>
        </div>
    );
}

export default Navbar;
