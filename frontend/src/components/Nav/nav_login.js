import React from "react";

// Icons
import back from "../../images/back-icon.svg";
import login from "../../images/login-icon.svg";

// Components
import ActionBtn from "../../components/Buttons/ActionBtn/ActionBtn";

// Styles
import styles from "./Nav.module.css";

const NavLogin = (props) => {
    return (
        <footer className={styles.btn_list}>
            <ActionBtn icon={back} name="retourner" onClick={props.backHandle} />
            <ActionBtn id="login-btn" form="login-form" name="connexion" type="submit" icon={login} />
        </footer>
    );
};

export default NavLogin;
