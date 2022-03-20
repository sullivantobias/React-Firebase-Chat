import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { HomePage } from "./pages/Home/Home";
import { Chat } from "./pages/Chat/Chat";
import { SignUp } from "./pages/Forms/Signup";
import { Login } from "./pages/Forms/Login";
import { auth } from "./services/firebase";
import { Loader } from "./components/Loader/Footer";

import './styles.scss';

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
    return (
        <Route
            { ...rest }
            render={ props =>
                authenticated === true ? (
                    <Component { ...props } />
                ) : (
                    <Redirect
                        to={ { pathname: "/login", state: { from: props.location } } }
                    />
                )
            }
        />
    );
};

const PublicRoute = ({ component: Component, authenticated, ...rest }) => {
    return (
        <Route
            { ...rest }
            render={ props =>
                authenticated === false ? (
                    <Component { ...props } />
                ) : (
                    <Redirect to="/chat"/>
                )
            }
        />
    );
};

const App = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        auth().onAuthStateChanged(user => {
            if (user) {
                setAuthenticated(true);
                setLoading(false);
            } else {
                setAuthenticated(false);
                setLoading(false);
            }
        });
    });

    return loading === true ? (
        <Loader dark/>
    ) : (
        <Router>
            <Switch>
                <Route exact path="/" component={ HomePage }/>
                <PrivateRoute
                    path="/chat"
                    authenticated={ authenticated }
                    component={ Chat }
                />
                <PublicRoute
                    path="/signup"
                    authenticated={ authenticated }
                    component={ SignUp }
                />
                <PublicRoute
                    path="/login"
                    authenticated={ authenticated }
                    component={ Login }
                />
            </Switch>
        </Router>
    );
};

export default App;
