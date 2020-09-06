import React, { useEffect } from "react";
import { fetch_url } from "../utils/";
import "../Styles/navbar.css";
import { Link } from "react-router-dom";

function Navbar(props: any) {
    async function logout() {
        await fetch_url("/u/signout", "GET");
        console.log(props.history);
        // props.history.push("/");
    }

    useEffect(() => {}, []);

    return (
        <div className="nav">
            <Link to="/">+Paste</Link>
            <Link to="/signin">Signin</Link>
            <Link to="/signup">Signup</Link>
            <Link onClick={logout} to="/">
                Logout
            </Link>
        </div>
    );
}

export default Navbar;
