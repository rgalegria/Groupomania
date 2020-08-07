import React from "react";
import styles from "./btn_nav.module.css";

const navBtn = (props) => {
    return (
        <button id={props.id} className={styles.btn} type={props.type}>
            <img className={styles.icon} src={props.icon} alt="A REVISAR" />
            <span className={styles.text}>{props.name}</span>
        </button>
    );
};

export default navBtn;
