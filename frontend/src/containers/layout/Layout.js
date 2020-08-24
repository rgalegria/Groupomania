import React from "react";

// Components
import Nav from "../../components/Nav/Nav";

// Styles
import "./Layout.css";

const Layout = (props) => {
    console.log("LAYOUT");
    return (
        <>
            <main className="container">{props.children}</main>
            <Nav />
        </>
    );
};

export default Layout;
