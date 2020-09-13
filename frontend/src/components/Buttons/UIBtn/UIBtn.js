import React from "react";

// Styles
import styles from "./UIBtn.module.css";

/*
Attends ==>

<ActionBtn 
    id={props.id}
    form={id du formulaire} 
    name={nom bu bouton} 
    type={type de bouton}
    onClick={fonction onClick}
    btType={"valid", "cancel", "warning"}
    icon={icon-name}
    iconColor={couleur de l'icône}
/>

*/

const UIBtn = (props) => {
    let icon;

    if (props.icon) {
        icon = <img id="icon" className={`${styles.icon} ${props.iconColor}`} src={props.icon} alt="" />;
    } else {
        icon = null;
    }

    let btnType;

    if (props.btnType === "valid") {
        btnType = styles.valid;
    }
    if (props.btnType === "cancel") {
        btnType = styles.cancel;
    }
    if (props.btnType === "warning") {
        btnType = styles.warning;
    }

    return (
        <button
            id={props.id}
            className={`${styles.btn} ${btnType} ${props.buttonClass}`}
            type={props.type}
            form={props.form}
            onClick={props.onClick}
        >
            <div className={styles.justify}>
                <span className={styles.text}>{props.name}</span>
                {icon}
            </div>
        </button>
    );
};

export default UIBtn;
