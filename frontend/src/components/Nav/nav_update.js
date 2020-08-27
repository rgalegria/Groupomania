import React, { useContext } from "react";
import { AuthContext } from "../../context/auth-context";

// Icons
import close from "../../images/close-icon.svg";

// Components
import NavBtn from "../Buttons/NavBtn/NavBtn";

// Styles
import styles from "./Nav.module.css";

const NavLogin = (props) => {
    // Authentication context
    const auth = useContext(AuthContext);

    return (
        <footer className={styles.btn_list}>
            <NavBtn icon={close} name="annuler" link={`/profile/${auth.userId}`} />
        </footer>
    );
};

export default NavLogin;
