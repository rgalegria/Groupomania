import React from "react";

import styles from "./btn_submit.module.css";

const SubmitBtn = (props) => {
    return (
        <button id={props.id} className={styles.btn} type={props.type} onClick={props.onClick}>
            <img className={styles.icon} src={props.icon} alt="A REVISAR" />
            {props.name}
        </button>
    );
};

export default SubmitBtn;
