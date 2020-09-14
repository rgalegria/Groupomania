import React, { useRef, useState } from "react";

// Styles
import styles from "./SelectField.module.css";

// Component
const SelectField = (props) => {
    // UseState des catégories
    const [category, setCategory] = useState();
    const [isValid, setIsValid] = useState(false);

    const categoryPickerRef = useRef();

    // Fontion qui prend l'option du select
    const pickedHandler = (event) => {
        let pickedCategory;
        let categoryIsValid = isValid;

        // Si le valeur dans l'événement est different à rien
        if (event.target.value !== " ") {
            pickedCategory = event.target.value;
            setCategory(pickedCategory);
            setIsValid(true);
            categoryIsValid = true;
        } else {
            setIsValid(false);
            categoryIsValid = false;
        }
        props.onInput(props.id, pickedCategory, categoryIsValid);
    };

    return (
        <div className={styles.dropdown}>
            <label className={styles.label} htmlFor={props.id}>
                {props.label}
            </label>
            <select
                id={props.id}
                className={`${styles.dropdown_btn}
        ${!isValid && category && styles.invalid}`}
                ref={categoryPickerRef}
                onChange={pickedHandler}
            >
                <option className={styles.option} value=" ">
                    Veuillez choisir une catégorie
                </option>
                {props.options.map((option, index) => {
                    return (
                        <option className={styles.option} key={index} value={option.id}>
                            {option.category}
                        </option>
                    );
                })}
            </select>
            {!isValid && category && <p className={styles.input_error}>{props.errorText}</p>}
        </div>
    );
};

export default SelectField;
