import React, { useEffect, useState } from "react";
import { fetch_url } from "../utils/";
import "../Styles/navbar.css";
import { Link } from "react-router-dom";
import Cookie from "js-cookie";
import { Icon } from "@blueprintjs/core";

function Navbar(props: any) {
    const [is_user, set_is_user] = useState<boolean>(false);
    async function logout() {
        await fetch_url("/u/signout", "GET");
        window.location.href = "/";
    }

    useEffect(() => {
        set_is_user(Cookie.get("express:sess") !== undefined);
    }, []);

    return (
        <div className="nav">
            <Link to="/">
                <Icon icon="insert" iconSize={20} />
            </Link>
            <Link to="/signin">Signin</Link>
            <Link to="/signup">Signup</Link>
            {is_user && (
                <>
                    <Link to="/profile/">Profile</Link>
                    <Link onClick={logout} to="/">
                        Logout
                    </Link>
                </>
            )}
        </div>
    );
}

export default Navbar;
