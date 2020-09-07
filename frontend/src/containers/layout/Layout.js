import React from "react";

// Components
import Nav from "../../components/Nav/Nav";

// Styles
import "./Layout.css";

const Layout = (props) => {
    return (
        <>
            <main className="wrapper">{props.children}</main>
            <Nav />
        </>
    );
};

export default Layout;
