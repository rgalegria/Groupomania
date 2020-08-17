import React, { useState } from "react";
import { withRouter } from "react-router-dom";

// Components
import NavBtn from "../../components/Nav components/btn_nav/btn_nav";
import SubmitBtn from "../../components/Form components/btn_submit/btn_submit";
import Aux from "../../hoc/Aux";

// Icons
import signup from "../../images/signup-icon.svg";
import login from "../../images/login-icon.svg";
import menu from "../../images/menu-icon.svg";
import post from "../../images/post-icon.svg";
import categories from "../../images/categories-icon.svg";
import comment from "../../images/comment-icon.svg";
import close from "../../images/close-icon.svg";
import back from "../../images/back-icon.svg";
import modify from "../../images/modify-icon.svg";

// Styles
import styles from "./Nav.module.css";

const Nav = (props) => {
    const backHandle = (e) => {
        e.preventDefault();
        props.history.goBack();
    };

    const [btnsState /*, setBtnsState*/] = useState([
        {
            id: "login-btn",
            form: "login-form",
            name: "connexion",
            type: "submit",
            icon: login,
            link: "/login",
        },
        {
            id: "signup-btn",
            form: "signup-form",
            name: "s'inscrire",
            type: "submit",
            icon: signup,
            link: "/signup",
        },
        {
            id: "menu",
            name: "menu",
            onClick: "menuHandle",
            icon: menu,
            type: "submit",
        },
        {
            id: "post",
            name: "poste",
            type: "submit",
            onClick: backHandle,
            icon: post,
        },
        {
            id: "categories",
            name: "categories",
            icon: categories,
            // type: "submit",
            link: "/feed/categories",
        },
        {
            name: "retourner",
            onClick: backHandle,
            icon: back,
        },
        {
            id: "comment",
            name: "commenter",
            icon: comment,
            // type: "submit",
            link: "/id:/comment",
        },
        {
            id: "close",
            name: "fermer",
            icon: close,
            // type: "submit",
            // link: "/signup",
        },
        {
            id: "modify",
            name: "modifier",
            icon: modify,
            // type: "submit",
            link: "/profile/id:/modify-profile",
        },
        {
            id: "cancel-menu",
            name: "annuler",
            icon: close,
            // type: "submit",
            link: "/profile/id:",
        },
    ]);

    let btns;

    switch (props.location.pathname) {
        case "/":
            btns = (
                <nav className={styles.btn_list}>
                    <NavBtn icon={btnsState[0].icon} name={btnsState[0].name} link={btnsState[0].link} />
                    <NavBtn icon={btnsState[1].icon} name={btnsState[1].name} link={btnsState[1].link} />
                </nav>
            );
            break;
        case "/login":
            btns = (
                <nav className={styles.btn_list}>
                    <SubmitBtn
                        type={btnsState[5].type}
                        onClick={btnsState[5].onClick}
                        icon={btnsState[5].icon}
                        name={btnsState[5].name}
                    />
                    <SubmitBtn
                        id={btnsState[0].id}
                        form={btnsState[0].form}
                        type={btnsState[0].type}
                        icon={btnsState[0].icon}
                        name={btnsState[0].name}
                    />
                </nav>
            );
            break;
        case "/signup":
            btns = (
                <nav className={styles.btn_list}>
                    <SubmitBtn
                        type={btnsState[5].type}
                        onClick={btnsState[5].onClick}
                        icon={btnsState[5].icon}
                        name={btnsState[5].name}
                    />
                    <SubmitBtn
                        id={btnsState[1].id}
                        form={btnsState[1].form}
                        type={btnsState[1].type}
                        icon={btnsState[1].icon}
                        name={btnsState[1].name}
                    />
                </nav>
            );
            break;
        // case "/feed":
        //     btns = (
        //         <nav className={styles.btn_list}>
        //             <NavBtn
        //                 id={btnsState[2].id}
        //                 icon={btnsState[2].icon}
        //                 name={btnsState[2].name}
        //                 type={btnsState[2].type}
        //                 link={btnsState[2].type}
        //             />
        //             <NavBtn
        //                 id={btnsState[3].id}
        //                 icon={btnsState[3].icon}
        //                 name={btnsState[3].name}
        //                 type={btnsState[3].type}
        //                 link={btnsState[3].type}
        //             />
        //             <NavBtn
        //                 id={btnsState[4].id}
        //                 icon={btnsState[4].icon}
        //                 name={btnsState[4].name}
        //                 type={btnsState[4].type}
        //                 link={btnsState[4].type}
        //             />
        //         </nav>
        //     );
        //     break;
        default:
            console.log("Something went wrong!");
    }

    return <Aux>{btns}</Aux>;
};

export default withRouter(Nav);
