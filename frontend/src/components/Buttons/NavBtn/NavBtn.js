import React from "react";
import { Link } from "react-router-dom";

// Styles
import styles from "./NavBtn.module.css";

const navBtn = (props) => {
    return (
        <Link to={props.link} className={styles.btn}>
            <img className={styles.icon} src={props.icon} alt="A REVISAR" />
            <span className={styles.text}>{props.name}</span>
        </Link>
    );
};

export default navBtn;
