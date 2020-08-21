import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./TabBtn.module.css";

const tabBtn = (props) => {
    let btn;
    if (props.active) {
        btn = (
            <NavLink to={props.link} className={styles.btn_active}>
                <div className={styles.container_active}>
                    <span className={styles.text_active}>{props.name}</span>
                    <img className={styles.icon_active} src={props.icon} alt={props.alt} />
                </div>
            </NavLink>
        );
    } else {
        btn = (
            <NavLink to={props.link} className={styles.btn}>
                <div className={styles.container}>
                    <span className={styles.text}>{props.name}</span>
                    <img className={styles.icon} src={props.icon} alt={props.alt} />
                </div>
            </NavLink>
        );
    }

    return <>{btn}</>;
};

export default tabBtn;
