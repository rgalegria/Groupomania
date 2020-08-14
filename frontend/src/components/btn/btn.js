import React from "react";
import styles from "./btn.module.css";

const Btn = (props) => {
    let icon;
    // let style;
    let style = props.icon ? styles.warning : styles.valid;

    if (props.icon) {
        icon = <img id="icon" className={styles.icon} src={props.icon} alt="A REVISAR" />;
    } else {
        icon = null;
    }

    return (
        <button id={props.id} className={`${styles.btn} ${style}`} type={props.type}>
            <div className={styles.justify}>
                <span className={styles.text}>{props.name}</span>
                {icon}
            </div>
        </button>
    );
};

export default Btn;
