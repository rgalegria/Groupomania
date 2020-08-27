import React from "react";
import { Route, Switch } from "react-router-dom";
import { useAuth } from "./hooks/auth-hook";
import { AuthContext } from "./context/auth-context";

// Containers
import Layout from "./containers/Layout/Layout";
import Home from "./containers/Home/Home";
import Login from "./containers/Login/Login";
import Signup from "./containers/SignUp/SignUp";
import Posts from "./containers/Posts/Posts";
import UserProfile from "./containers/UserProfile/UserProfile";
import UpdateProfile from "./containers/UpdateProfile/UpdateProfile";
import CommentPost from "./containers/CommentPost/CommentPost";
// import NewPost from "./containers/NewPost/NewPost";

const App = () => {
    console.log("APP");

    const { token, login, logout, userId } = useAuth();

    let routes;

    if (token) {
        routes = (
            <Switch>
                <Route path="/posts" exact component={Posts} />
                {/* <Route path="/posts/new" exact component={NewPost} /> */}
                <Route path="/menu" />
                <Route path="/profile/:id" exact component={UserProfile} />
                <Route path="/profile/:id/update" component={UpdateProfile} />
                <Route path="/posts/:id" exact component={CommentPost} />
            </Switch>
        );
    } else {
        routes = (
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" exact component={Login} />
                <Route path="/signup" exact component={Signup} />
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
