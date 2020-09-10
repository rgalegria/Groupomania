import React, { useRef } from "react";

// Styles
import styles from "./SelectField.module.css";

// Component
const SelectField = (props) => {
    const categoryPickerRef = useRef();

    const pickedHandler = (event) => {
        let pickedCategory;
        let categoryIsValid = false;
        if (event.target.value !== " ") {
            pickedCategory = event.target.value;

            categoryIsValid = true;
        } else {
            categoryIsValid = false;
        }
        props.onInput(props.id, pickedCategory, categoryIsValid);
    };

    return (
        <div className={styles.dropdown}>
            <label className={styles.label} htmlFor={props.id}>
                {props.label}
            </label>
            <select id={props.id} className={styles.dropdown_btn} ref={categoryPickerRef} onChange={pickedHandler}>
                <option className={styles.option} value=" ">
                    Veillez choisir une catégorie
                </option>
                {props.options.map((option, index) => {
                    return (
                        <option className={styles.option} key={index} value={option.id}>
                            {option.category}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

export default SelectField;
