import React from "react";

// Styles
import styles from "./TabBtn.module.css";

/*
Attends ==>

<TabBtn 
    name={texte du bouton}
    onClick={fonction onClick}
    icon={icon-name}
/>

*/

const TabBtn = (props) => {
    let btn;

    if (props.active === "active") {
        btn = (
            <button className={styles.btn_active} onClick={props.onClick}>
                <div className={styles.container_active}>
                    <span className={styles.text_active}>{props.name}</span>
                    <img className={styles.icon_active} src={props.icon} alt="" />
                </div>
            </button>
        );
    } else {
        btn = (
            <button className={styles.btn} onClick={props.onClick}>
                <div className={styles.container}>
                    <span className={styles.text}>{props.name}</span>
                    <img className={styles.icon} src={props.icon} alt="" />
                </div>
            </button>
        );
    }

    return <>{btn}</>;
};

export default TabBtn;
