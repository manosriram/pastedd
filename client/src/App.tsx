import React from "react";
import {
    Navbar,
    Home,
    Test,
    Signup,
    Signin,
    Paste,
    Profile
} from "./Components/";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./Styles/App.css";

function App() {
    return (
        <>
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path="/profile/" component={Profile} />
                    <Route exact path="/signup/" component={Signup} />
                    <Route exact path="/signin/" component={Signin} />
                    <Route exact path="/p/:paste_id/" component={Paste} />
                    <Route path="/" component={Home} />
                </Switch>
            </Router>
        </>
    );
}

export default App;
