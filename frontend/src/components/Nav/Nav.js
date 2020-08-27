import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import { useParams } from "react-router-dom";

// Components
import NavHome from "./nav_home";
import NavLogin from "./nav_login";
import NavSignUp from "./nav_signup";
import NavPost from "./nav_posts";
import NavComments from "./nav_comments";
import NavProfile from "./nav_profile";
import NavUpdate from "./nav_update";

const Nav = (props) => {
    // Authentication context
    const auth = useContext(AuthContext);

    const id = props.location.pathname.split("/")[2];

    const backHandle = (e) => {
        e.preventDefault();
        props.history.goBack();
    };

    let nav;

    switch (props.location.pathname) {
        case "/":
            nav = <NavHome />;
            break;
        case "/login":
            nav = <NavLogin backHandle={backHandle} />;
            break;
        case "/signup":
            nav = <NavSignUp backHandle={backHandle} />;
            break;
        case "/posts":
            if (auth.isLoggedIn) {
                nav = <NavPost backHandle={backHandle} />;
            }
            break;
        case `/posts/${id}`:
            if (auth.isLoggedIn) {
                nav = <NavComments backHandle={backHandle} commentHandle={backHandle} />;
            }
            break;
        case `/profile/${id}`:
            if (auth.isLoggedIn) {
                nav = <NavProfile backHandle={backHandle} />;
            }
            break;
        case `/profile/${auth.userId}/update`:
            if (auth.isLoggedIn) {
                nav = <NavUpdate />;
            }
            break;
        default:
            console.log("NAV: Something went wrong!");
    }

    return <>{nav}</>;
};

export default withRouter(Nav);
