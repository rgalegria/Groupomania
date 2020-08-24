import React from "react";

// Icons
import back from "../../images/back-icon.svg";
import modify from "../../images/modify-icon.svg";

// Components
import ActionBtn from "../../components/Buttons/ActionBtn/ActionBtn";
import NavBtn from "../../components/Buttons/NavBtn/NavBtn";

// Styles
import styles from "./Nav.module.css";

const NavProfile = (props) => {
    return (
        <footer className={styles.btn_list}>
            <ActionBtn icon={back} name="retourner" onClick={props.backHandle} />
            <NavBtn id="modify" name="modifier" icon={modify} link="/profile/id:/modify" />
        </footer>
    );
};

export default NavProfile;
