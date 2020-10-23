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
import Menu from "./containers/Menu/Menu";
import UserProfile from "./containers/UserProfile/UserProfile";
import UpdateProfile from "./containers/UpdateProfile/UpdateProfile";
import CommentPost from "./containers/CommentPost/CommentPost";
import NewPost from "./containers/NewPost/NewPost";

// Styles
import "./App.css";

const App = () => {
    const { userId, token, account, login, logout } = useAuth();

    let routes;

    if (token) {
        routes = (
            <Switch>
                <Route path="/posts" exact component={Posts} />
                <Route path="/posts/new" exact component={NewPost} />
                <Route path="/menu" exact component={Menu} />
                <Route path="/profile/:id" exact component={UserProfile} />
                <Route path="/profile/:id/update" exact component={UpdateProfile} />
                <Route path="/posts/:id" exact component={CommentPost} />
                {/* <Redirect to="/posts" /> */}
            </Switch>
        );
    } else {
        routes = (
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" exact component={Login} />
                <Route path="/signup" exact component={Signup} />
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
                account: account,
                login: login,
                logout: logout,
            }}
        >
            <Layout>{routes}</Layout>
        </AuthContext.Provider>
    );
};

export default App;
