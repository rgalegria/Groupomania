import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// Containers
import Layout from "./containers/Layout/Layout";
import Home from "./containers/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/SignUp/SignUp";

const App = (props) => {
    let routes = (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Redirect to="/" />
        </Switch>
    );

    // if (this.props.isAuthenticated) {
    //     routes = (
    //         <Switch>
    //             <Route path="/logout" />
    //             <Redirect to="/posts" />
    //             <Redirect to="/posts/id:" />
    //             <Redirect to="/posts/id:/comments" />
    //             <Redirect to="/user/id:" />
    //             <Redirect to="/user/id:/modify" />
    //         </Switch>
    //     );
    // }

    return (
        <div>
            <Layout>{routes}</Layout>
        </div>
    );
};

export default App;
