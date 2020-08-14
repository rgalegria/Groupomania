import React from "react";

// Components
import Nav from "../nav/Nav";
import Aux from "../../hoc/Aux";

// Styles
import "./Layout.css";

const Layout = (props) => {
    return (
        <Aux>
            <main className="container">{props.children}</main>
            <Nav />
        </Aux>
    );
};

export default Layout;
