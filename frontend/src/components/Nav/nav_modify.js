import React from "react";

// Icons
import close from "../../images/close-icon.svg";

// Components
import ActionBtn from "../../components/Buttons/ActionBtn/ActionBtn";

// Styles
import styles from "./Nav.module.css";

const NavLogin = (props) => {
    return (
        <footer className={styles.btn_list}>
            <ActionBtn icon={close} name="retourner" onClick={props.backHandle} />
        </footer>
    );
};

export default NavLogin;
