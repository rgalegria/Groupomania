import React from "react";

import styles from "./ActionBtn.module.css";

const ActionBtn = (props) => {
    return (
        <button id={props.id} form={props.form} className={styles.btn} type={props.type} onClick={props.onClick}>
            <img className={styles.icon} src={props.icon} alt="A REVISAR" />
            {props.name}
        </button>
    );
};

export default ActionBtn;
