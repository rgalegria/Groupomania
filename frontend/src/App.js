import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useAuth } from "./hooks/auth-hook";
import { AuthContext } from "./context/auth-context";

// Containers
import Layout from "./containers/Layout/Layout";
import Home from "./containers/Home/Home";
import Login from "./containers/Login/Login";
import Signup from "./containers/SignUp/SignUp";
import Posts from "./containers/Posts/Posts";
import UserProfile from "./containers/UserProfile/UserProfile";

const App = () => {
    const { token, login, logout, userId } = useAuth();

    let routes;

    if (token) {
        routes = (
            <Switch>
                <Route path="/posts" exact component={Posts} />
                <Route path="/menu" />
                <Route path={`/profile/${userId}`} exact component={UserProfile} />
                <Route path="/posts/id:" />
                <Route path="/posts/id:/comments" />
                <Route path="/profile/id:/modify" />
                <Redirect to="/posts" />
            </Switch>
        );
    } else {
        routes = (
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" exact component={Login} />
                <Route path="/signup" exact component={Signup} />
                <Route path={`/profile/${userId}`} component={UserProfile} />
                {/* <Redirect to="/" /> */}
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
