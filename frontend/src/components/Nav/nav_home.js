import React from "react";

// Icons
import signup from "../../images/signup-icon.svg";
import login from "../../images/login-icon.svg";

// Components
import NavBtn from "../../components/Buttons/NavBtn/NavBtn";

// Styles
import styles from "./Nav.module.css";

const NavHome = () => {
    return (
        <footer className={styles.btn_list}>
            <NavBtn icon={login} name="connexion" link="/login" />
            <NavBtn icon={signup} name="s'inscrire" link="/signup" />
        </footer>
    );
};

export default NavHome;
