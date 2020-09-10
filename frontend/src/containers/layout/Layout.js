import React from "react";
import { withRouter } from "react-router-dom";
import { useWindowDimensions } from "../../hooks/window-hook";

// Components
import Nav from "../../components/Nav/Nav";
import Menu from "../Menu/Menu";

// Styles
import "./Layout.css";

const Layout = (props) => {
    // Window Size
    const { width } = useWindowDimensions();

    // App path
    const path = props.location.pathname;

    const mobileLayout = (
        <>
            <main className="home_wrapper">{props.children}</main>
            <Nav />
        </>
    );

    const desktopLayout = (
        <>
            <div className="desktop_wrap">
                <Menu />
                <main className="wrapper">{props.children}</main>
            </div>
            <p className="disclaimer">
                Plan du site © Groupomania 2020. La Societé ne prend aucune responsabilité légale sur les publications
                faites par ses employés.
            </p>
        </>
    );

    // Mobile Layout
    if (width <= 1023) {
        return mobileLayout;
    }

    // Desktop Layout
    if (width >= 1024) {
        switch (path) {
            case "/":
                return mobileLayout;
            // break;
            case "/login":
                return mobileLayout;
            // break;
            case "/signup":
                return mobileLayout;
            // break;
            default:
                return desktopLayout;
        }
    }
};

export default withRouter(Layout);
