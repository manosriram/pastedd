import React from "react";
import { Navbar, Home, Test, Signup } from "./Components/";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./Styles/App.css";

function App() {
    return (
        <>
            <Navbar />
            <Router>
                <Switch>
                    <Route exact path="/signup/" component={Signup} />
                    <Route exact path="/" component={Home} />
                </Switch>
            </Router>
        </>
    );
}

export default App;
