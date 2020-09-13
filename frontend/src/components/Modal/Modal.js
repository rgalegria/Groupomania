import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

// Components
import Backdrop from "../Backdrop/Backdrop";

//Styles
import styles from "./Modal.module.css";

const ModalOverlay = (props) => {
    const content = (
        <div className={`${styles.modal} ${props.className}`} style={props.style}>
            {/* <header className={`${styles.modal__header} ${props.headerClass}`}>
                <h2>{props.header}</h2>
            </header> */}
            <form onSubmit={props.onSubmit ? props.onSubmit : (event) => event.preventDefault()}>
                <div className={`${styles.modal__content} ${props.contentClass}`}>{props.children}</div>
                <footer className={`${styles.modal__footer} ${props.footerClass}`}>{props.footer}</footer>
            </form>
        </div>
    );
    return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
    return (
        <>
            {props.show && <Backdrop onClick={props.onCancel} />}
            <CSSTransition in={props.show} mountOnEnter unmountOnExit timeout={10} classNames={styles.modal}>
                <ModalOverlay {...props} />
            </CSSTransition>
        </>
    );
};

export default Modal;
