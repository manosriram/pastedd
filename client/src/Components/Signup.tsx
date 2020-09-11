import React, { useState, useEffect } from "react";
import { Input, LinkTag } from "../Styled-Components/";
import "../Styles/App.css";
import { fetch_url } from "../utils/";

import {
    Spinner,
    Button,
    IToasterProps,
    IToastProps,
    Label,
    NumericInput,
    Position,
    ProgressBar,
    Switch,
    Toaster,
    ToasterPosition
} from "@blueprintjs/core";

const message_toast = Toaster.create({
    className: "ex",
    position: Position.TOP
});

function Signup() {
    const [user_det, set_user_det] = useState<any>({
        email: "",
        user_name: "",
        password: ""
    });
    const [spin, set_spin] = useState<boolean>(false);

    const handle_signup = (e: any) => {
        set_user_det({ ...user_det, [e.target.name]: e.target.value });
    };

    const submit_form = async (e: any) => {
        try {
            e.preventDefault();
            set_spin(true);
            const { email, user_name, password } = user_det;
            if (!email || !user_name || !password) {
                message_toast.show({
                    intent: "danger",
                    message: "Please fill all the fields."
                });
                set_spin(false);
                return;
            }
            const response = await fetch_url("/u/signup", "POST", {
                email,
                user_name,
                password
            });
            if (response.success)
                message_toast.show({
                    intent: "success",
                    message: response.message
                });
            else
                message_toast.show({
                    intent: "danger",
                    message: response.message
                });

            set_spin(false);
        } catch (e) {
            console.log(e);
        }
    };

    if (spin) return <Spinner intent="primary" className="spin" />;

    return (
        <>
            <div className="signup-container">
                <form action="" onChange={handle_signup} onSubmit={submit_form}>
                    <h3>Signup Page</h3>
                    <hr />
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        required
                    />
                    <Input
                        type="text"
                        name="user_name"
                        placeholder="Username (4 min)"
                        required
                    />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password (4 min)"
                        required
                    />
                    <br />

                    <Button
                        type="submit"
                        onClick={submit_form}
                        icon="send-to"
                        intent="success"
                    >
                        Signup
                    </Button>
                </form>
            </div>
            <div id="related-links">
                <h3>Related Links</h3>
                <hr />
                <LinkTag href="/signin">SignIn</LinkTag>
                <br />
                <br />
                <LinkTag href="/forgot-pass">Forgot Password</LinkTag>
                <br />
                <br />
                <LinkTag href="/forgot-username">Forgot Username</LinkTag>
                <br />
                <br />
                <div className="btn-group">
                    <a className="btn btn-danger disabled">
                        <i className="fab fa-google"></i>
                    </a>
                    <a className="btn btn-danger" href="/">
                        {" "}
                        Signup with Google
                    </a>
                </div>
                <br />
                <br />
                <div className="btn-group">
                    <a className="btn btn-primary disabled">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a className="btn btn-primary" href="/">
                        Signup with Twitter
                    </a>
                </div>
            </div>
        </>
    );
}

export default Signup;
