import React from "react";

// Icons
import back from "../../images/back-icon.svg";
import signup from "../../images/signup-icon.svg";

// Components
import ActionBtn from "../Buttons/ActionBtn/ActionBtn";

// Styles
import styles from "./Nav.module.css";

const NavSignUp = (props) => {
    return (
        <footer className={styles.btn_list}>
            <ActionBtn icon={back} name="retourner" onClick={props.backHandle} />
            <ActionBtn id="signup-btn" form="signup-form" name="s'inscrire" type="submit" icon={signup} />
        </footer>
    );
};

export default NavSignUp;
