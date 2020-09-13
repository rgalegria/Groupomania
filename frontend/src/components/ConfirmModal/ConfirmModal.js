import React from "react";

// Icons
import ok from "../../images/ok-icon.svg";

// Components
import Modal from "../Modal/Modal";
import UIBtn from "../Buttons/UIBtn/UIBtn";

// Styles
import styles from "./ConfirmModal.module.css";

const ConfirmModal = (props) => {
    return (
        <Modal
            show={props.show}
            onCancel={props.onCancel}
            // header="titre du modal"
            footer={
                <UIBtn
                    id="accept-btn"
                    name="Ok"
                    type="submit"
                    btnType="warning"
                    onClick={props.onCancel}
                    buttonClass={styles.btn}
                />
            }
        >
            <img className={`${styles.okIcon} icon_green`} src={ok} alt="" />
            <p>{props.message}</p>
        </Modal>
    );
};

export default ConfirmModal;
