import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// Containers
import Layout from "./containers/layout/Layout";
import Home from "./containers/home/Home";
import Login from "./components/login/Login";
import Signup from "./components/signup/SignUp";

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
    //             <Route path="/checkout" component={asyncCheckout} />
    //             <Route path="/orders" component={asyncOrders} />
    //             <Route path="/logout" component={Logout} />
    //             <Route path="/auth" component={asyncAuth} />
    //             <Route path="/" exact component={BurgerBuilder} />
    //             <Redirect to="/post" />
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
