import React from "react";

// Components
import Nav from "../nav/Nav";

// Styles
import "./Layout.css";

const Layout = (props) => {
    return (
        <>
            <main className="container">{props.children}</main>
            <Nav />
        </>
    );
};

export default Layout;
