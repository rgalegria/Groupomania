import React from "react";
import { withRouter } from "react-router-dom";

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

// Styles
import styles from "./Nav.module.css";

const Nav = (props) => {
    const backHandle = (e) => {
        e.preventDefault();
        props.history.goBack();
    };

    let btns;

    switch (props.location.pathname) {
        case "/":
            btns = (
                <nav className={styles.btn_list}>
                    <NavHome />
                </nav>
            );
            break;
        case "/login":
            btns = (
                <nav className={styles.btn_list}>
                    <NavLogin onClick={backHandle} />
                </nav>
            );
            break;
        case "/signup":
            btns = (
                <nav className={styles.btn_list}>
                    <NavSignUp onClick={backHandle} />
                </nav>
            );
            break;
        case "/posts":
            btns = (
                <nav className={styles.btn_list}>
                    <NavPost onClick={backHandle} />
                </nav>
            );
            break;
        case "/posts/id:/comment":
            btns = (
                <nav className={styles.btn_list}>
                    <ActionBtn icon={back} name="retourner" onClick={backHandle} />
                    <ActionBtn id="comment" name="commenter" icon={comment} onClick={backHandle} />
                </nav>
            );
            break;
        case "/profile/id:":
            btns = (
                <nav className={styles.btn_list}>
                    <ActionBtn icon={back} name="retourner" onClick={backHandle} />
                    <NavBtn id="modify" name="modifier" icon={modify} link="/profile/id:/modify" />
                </nav>
            );
            break;
        case "/profile/id:/modify":
            btns = (
                <nav className={styles.btn_list}>
                    <ActionBtn icon={close} name="annuler" onClick={backHandle} />
                </nav>
            );
            break;
        default:
            console.log("Something went wrong!");
    }

    return <>{btns}</>;
};

export default withRouter(Nav);
