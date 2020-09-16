import React from "react";
import {
    Nav,
    Home,
    Signup,
    Signin,
    Paste,
    Profile,
    User,
    Edit,
    Raw,
    About
} from "./Components/";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./Styles/App.css";
import { Helmet } from "react-helmet";

function App() {
    return (
        <>
            <Helmet>
                <title>Pastedd</title>
                <meta name="description" content="Pastedd Home" />
            </Helmet>
            <Router>
                <Nav />
                <Switch>
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/u/:user_name/" component={User} />
                    <Route exact path="/edit/:paste_id/" component={Edit} />
                    <Route exact path="/signup/" component={Signup} />
                    <Route exact path="/signin/" component={Signin} />
                    <Route exact path="/p/:paste_id/" component={Paste} />
                    <Route exact path="/p/raw/:paste_id/" component={Raw} />
                    <Route path="/about" component={About} />
                    <Route path="/" component={Home} />
                </Switch>
            </Router>
        </>
    );
}

export default App;
