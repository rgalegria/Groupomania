import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import { useParams } from "react-router-dom";

// Components
import NavHome from "../../components/Nav/nav_home";
import NavLogin from "../../components/Nav/nav_login";
import NavSignUp from "../../components/Nav/nav_signup";
import NavPost from "../../components/Nav/nav_posts";
import NavComments from "../../components/Nav/nav_comments";
import NavProfile from "../../components/Nav/nav_profile";
import NavModify from "../../components/Nav/nav_modify";

const Nav = (props) => {
    const auth = useContext(AuthContext);

    console.log("Auth NAV 1:", auth);
    const paramId = useParams().id;

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
        case "/posts/:id/comment":
            if (auth.isLoggedIn) {
                nav = <NavComments backHandle={backHandle} commentHandle={backHandle} />;
            }
            break;
        case `/profile/${paramId}`:
            // if (auth.isLoggedIn) {
            nav = <NavProfile />;
            // }
            break;
        case `/profile/${auth.userId}/modify`:
            if (auth.isLoggedIn) {
                nav = <NavModify name="annuler" backHandle={backHandle} />;
            }
            break;
        default:
            console.log("Something went wrong!");
            console.log("auth NAV 2:", auth);
    }

    return <>{nav}</>;
};

export default withRouter(Nav);
