import React, { useEffect, useState } from "react";
import { fetch_url } from "../utils/";
import "../Styles/navbar.css";
import { Link } from "react-router-dom";
import Cookie from "js-cookie";
import {
    Icon,
    NavbarGroup,
    Navbar,
    Alignment,
    Button,
    Popover,
    Position,
    Tooltip
} from "@blueprintjs/core";

function Nav(props: any) {
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
            <Navbar>
                <Navbar.Group align={Alignment.LEFT}>
                    <Link to="/">
                        <Navbar.Heading>
                            <Tooltip
                                content="New Paste"
                                position={Position.RIGHT}
                            >
                                <Icon icon="insert" iconSize={20} />
                            </Tooltip>
                        </Navbar.Heading>
                    </Link>
                    <Navbar.Divider />
                    <Link to="/signin">Signin</Link>
                    <Icon icon="log-in" iconSize={20} />
                    <Navbar.Divider />
                    <Link to="/signup">Signup</Link>
                    <Icon icon="person" iconSize={20} />
                    <Navbar.Divider />
                    {is_user && (
                        <>
                            <Link to="/profile/">Profile</Link>
                            <Icon icon="id-number" iconSize={20} />
                            <Navbar.Divider />
                            <Link onClick={logout} to="/">
                                Logout
                            </Link>
                            <Icon icon="log-out" iconSize={20} />
                        </>
                    )}
                </Navbar.Group>
            </Navbar>
        </div>
    );
}

export default Nav;
