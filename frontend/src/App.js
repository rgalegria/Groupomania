import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useAuth } from "./hooks/auth-hook";
import { AuthContext } from "./context/auth-context";

// Containers
import Layout from "./containers/Layout/Layout";
import Home from "./containers/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/SignUp/SignUp";
import Posts from "./containers/Posts/Posts";

const App = () => {
    const { token, login, logout, userId } = useAuth();

    let routes;

    if (token) {
        routes = (
            <Switch>
                <Route path="/posts" exact component={Posts} />
                <Route path="/menu" />
                <Route path="/posts/id:" />
                <Route path="/posts/id:/comments" />
                <Route path="/user/id:" />
                <Route path="/user/id:/modify" />
                <Redirect to="/posts" />
            </Switch>
        );
    } else {
        routes = (
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" exact component={Login} />
                <Route path="/signup" exact component={Signup} />
                <Redirect to="/" />
            </Switch>
        );
    }

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: !!token,
                token: token,
                userId: userId,
                login: login,
                logout: logout,
            }}
        >
            <Layout>{routes}</Layout>
        </AuthContext.Provider>
    );
};

export default App;
