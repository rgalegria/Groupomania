import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

// Icons
import comment from "../../images/comment-icon.svg";
import close from "../../images/close-icon.svg";
import back from "../../images/back-icon.svg";
import modify from "../../images/modify-icon.svg";

// Components
import NavBtn from "../../components/Buttons/NavBtn/NavBtn";
import ActionBtn from "../../components/Buttons/ActionBtn/ActionBtn";
import NavHome from "../../components/Nav/nav_home";
import NavLogin from "../../components/Nav/nav_login";
import NavSignUp from "../../components/Nav/nav_signup";
import NavPost from "../../components/Nav/nav_posts";
import NavComments from "../../components/Nav/nav_comments";

// Styles
import styles from "./Nav.module.css";

const Nav = (props) => {
    const auth = useContext(AuthContext);

    const backHandle = (e) => {
        e.preventDefault();
        props.history.goBack();
    };

    let nav;

    switch (props.location.pathname) {
        case "/":
            nav = (
                <nav className={styles.btn_list}>
                    <NavHome />
                </nav>
            );
            break;
        case "/login":
            nav = (
                <nav className={styles.btn_list}>
                    <NavLogin backHandle={backHandle} />
                </nav>
            );

            break;
        case "/signup":
            nav = (
                <nav className={styles.btn_list}>
                    <NavSignUp backHandle={backHandle} />
                </nav>
            );
            break;
        case "/posts":
            console.log("auth de nav:", auth);
            if (auth.isLoggedIn) {
                nav = (
                    <nav className={styles.btn_list}>
                        <NavPost backHandle={backHandle} />
                    </nav>
                );
            }
            break;
        case "/posts/id:/comment":
            if (auth.isLoggedIn) {
                nav = (
                    <nav className={styles.btn_list}>
                        <NavComments backHandle={backHandle} commentHandle={backHandle} />
                    </nav>
                );
            }
            break;
        case "/profile/id:":
            if (auth.isLoggedIn) {
                nav = (
                    <nav className={styles.btn_list}>
                        <ActionBtn icon={back} name="retourner" onClick={backHandle} />
                        <NavBtn id="modify" name="modifier" icon={modify} link="/profile/id:/modify" />
                    </nav>
                );
            }
            break;
        case "/profile/id:/modify":
            if (auth.isLoggedIn) {
                nav = (
                    <nav className={styles.btn_list}>
                        <ActionBtn icon={close} name="annuler" onClick={backHandle} />
                    </nav>
                );
            }
            break;

        default:
            console.log("Something went wrong!");
    }

    return <>{nav}</>;
};

export default withRouter(Nav);
