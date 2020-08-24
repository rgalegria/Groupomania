import React from "react";

// Icons
import back from "../../images/back-icon.svg";
import comment from "../../images/comment-icon.svg";

// Components
import ActionBtn from "../../components/Buttons/ActionBtn/ActionBtn";

// Styles
import styles from "./Nav.module.css";

const NavComments = (props) => {
    return (
        <footer className={styles.btn_list}>
            <ActionBtn icon={back} name="retourner" onClick={props.backHandle} />
            <ActionBtn id="comment-btn" form="comment-form" name="commenter" type="submit" icon={comment} />
        </footer>
    );
};

export default NavComments;
