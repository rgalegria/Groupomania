import React from "react";
import ReactDOM from "react-dom";

// Styles
import styles from "./Backdrop.module.css";

const Backdrop = (props) => {
    // Portail référencé sur l'html principal comme "Backdrop-hook"
    return ReactDOM.createPortal(
        <div className={styles.backdrop} onClick={props.onClick}></div>,
        document.getElementById("backdrop-hook")
    );
};

export default Backdrop;
