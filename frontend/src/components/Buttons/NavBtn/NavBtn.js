import React from "react";
import { Link } from "react-router-dom";

// Styles
import styles from "./NavBtn.module.css";

/*
Attends ==>

<NavBtn 
    link={props.link} 
    btnStyle={styles.class-name}
    textStyle={styles.class-name}
    icon={icon-name}
/>

*/

const NavBtn = (props) => {
    return (
        <Link to={props.link} className={props.btnStyle || styles.btn}>
            <img className={`${styles.icon} ${props.iconColor}`} src={props.icon} alt="" />
            <span className={props.textStyle || styles.text}>{props.name}</span>
        </Link>
    );
};

export default NavBtn;
