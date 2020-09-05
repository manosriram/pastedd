import React from "react";
import { Button, Input, LinkTag } from "../Styled-Components/";
import "../Styles/App.css";

function Signup() {
    return (
        <>
        <div className="signup-container">
            <form action="">
                <h3>Signup Page</h3>
                <hr />
                <Input placeholder="Email Address"/>
                <Input placeholder="Username (4 min)"/>
                <Input placeholder="Password (4 min)"/>
                <br />
                
                <Button>Signup</Button>
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
		<a className='btn btn-danger disabled'><i className="fab fa-google"></i></a>
		<a className='btn btn-danger' href='/'> Sign in with Google</a>
            </div>
            <br />
            <br />
            <div className="btn-group">
		<a className='btn btn-primary disabled'><i className="fab fa-twitter"></i></a>
		<a className='btn btn-primary' href='/'>Signup with Twitter</a>
            </div>
        </div>
        </>
    );
}

export default Signup;
