import React from "react";
import styles from "./TabBtn.module.css";

const tabBtn = (props) => {
    return (
        <button className={styles.btn}>
            <div className={styles.container}>
                <span className={styles.text_active}>{props.name}</span>
                <img className={styles.icon} src={props.icon} alt="A REVISAR" />
            </div>
        </button>
    );
};

export default tabBtn;
