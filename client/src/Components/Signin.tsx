import React, { useState, useEffect } from "react";
import { Input, LinkTag } from "../Styled-Components/";
import "../Styles/App.css";
import "../Styles/Responsive.css";
import { fetch_url } from "../utils/";
import Cookie from "js-cookie";
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

function Signin() {
    const [user_det, set_user_det] = useState<any>({
        user_name: "",
        password: ""
    });
    const [is_signed_in, set_signed_in] = useState<boolean>(false);
    const [spin, set_spin] = useState<boolean>(false);

    const handle_signin = (e: any) => {
        set_user_det({ ...user_det, [e.target.name]: e.target.value });
    };

    const submit_form = async (e: any) => {
        try {
            e.preventDefault();
            set_spin(true);
            const { user_name, password } = user_det;
            if (!user_name || !password) {
                message_toast.show({
                    intent: "danger",
                    message: "Please fill all the fields."
                });
                set_spin(false);
                return;
            }
            const response = await fetch_url("/u/signin", "POST", {
                user_name,
                password
            });
            if (response.success) {
                Cookie.set("user", user_name);
                message_toast.show({
                    intent: "success",
                    message: response.message
                });
                window.location.href = "/";
            } else
                message_toast.show({
                    intent: "danger",
                    message: response.message
                });

            set_spin(false);
        } catch (e) {
            console.log(e);
        }
    };

    if (spin) return <Spinner className="spin" intent="primary" />;

    return (
        <>
            <div className="signup-container">
                <form action="" onChange={handle_signin} onSubmit={submit_form}>
                    <h3>Signin Page</h3>
                    <hr />
                    <Input
                        type="text"
                        name="user_name"
                        placeholder="Username"
                        required
                    />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                    />
                    <br />
                    <Button
                        type="submit"
                        onClick={submit_form}
                        icon="send-to"
                        intent="success"
                    >
                        Signin
                    </Button>
                </form>
            </div>
            <div id="related-links">
                <h3>Related Links</h3>
                <hr />
                <LinkTag href="/signup">Signup</LinkTag>
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
                        Signin with Google
                    </a>
                </div>
                <br />
                <br />
                <div className="btn-group">
                    <a className="btn btn-primary disabled">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a className="btn btn-primary" href="/">
                        Signin with Twitter
                    </a>
                </div>
            </div>
        </>
    );
}

export default Signin;
