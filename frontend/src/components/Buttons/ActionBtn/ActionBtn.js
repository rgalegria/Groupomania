import React from "react";

// Styles
import styles from "./ActionBtn.module.css";

/*
Attends ==>

<ActionBtn 
    id={props.id}
    form={id du formulaire} 
    type={type de bouton}
    onClick={fonction onClick}
    icon={icon-name}
    iconColor={couleur de l'icône}
/>

*/

const ActionBtn = (props) => {
    return (
        <button id={props.id} form={props.form} className={styles.btn} type={props.type} onClick={props.onClick}>
            <img className={`${styles.icon} ${props.iconColor}`} src={props.icon} alt="" />
            {props.name}
        </button>
    );
};

export default ActionBtn;
