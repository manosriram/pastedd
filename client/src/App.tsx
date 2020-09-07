import React from "react";
import { Navbar, Home, Test, Signup, Signin } from "./Components/";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./Styles/App.css";

function App() {
    return (
        <>
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path="/signup/" component={Signup} />
                    <Route exact path="/signin/" component={Signin} />
                    <Route exact path="/" component={Home} />
                </Switch>
            </Router>
        </>
    );
}

export default App;
