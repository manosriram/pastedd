import React from "react";
import { fetch_url } from "../utils/";
import "../Styles/navbar.css";


function Navbar(props: any) {

    async function logout() {
        await fetch_url("/u/signout", "GET");
        console.log(props.history);
        // props.history.push("/");
    }

    return (
        <div className="nav">
            <a href="/">Pastedd</a>
            <a href="/">+Paste</a>
            <a href="/signin">Signin</a>
            <a href="/signup/">Signup</a>
            <a onClick={logout}>Logout</a>
        </div>
    );
}

export default Navbar;
