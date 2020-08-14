import React from "react";
import styles from "./UpdateField.module.css";

const inputField = (props) => {
    return (
        <div className={styles.block}>
            <label className={styles.label} htmlFor={props.id}>
                {props.name}
            </label>
            <div className={styles.wrapper}>
                <input
                    className={styles.box}
                    id={props.id}
                    name={props.name}
                    type={props.type}
                    placeholder={props.placeholder}
                    minLength={props.minLength}
                    maxLength={props.maxLength}
                    autoComplete={props.autocomplete}
                ></input>
                <img className={styles.icon} src={props.icon} alt={props.alt} />
            </div>
        </div>
    );
};

export default inputField;
