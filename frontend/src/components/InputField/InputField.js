import React, { useReducer, useEffect } from "react";
import { validate } from "../../utils/validators";

// Styles
import styles from "./InputField.module.css";

const inputReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE":
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators),
            };
        case "TOUCH": {
            return {
                ...state,
                isTouched: true,
            };
        }
        default:
            return state;
    }
};

// Component
const InputField = (props) => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue || "",
        isTouched: false,
        isValid: props.initialValid || false,
    });

    const { id, onInput } = props;
    const { value, isValid } = inputState;

    useEffect(() => {
        onInput(id, value, isValid);
    }, [id, value, isValid, onInput]);

    const changeHandler = (event) => {
        dispatch({
            type: "CHANGE",
            val: event.target.value,
            validators: props.validators,
        });
    };

    const touchHandler = () => {
        dispatch({
            type: "TOUCH",
        });
    };

    let textColor;
    let borderColor;
    if (props.textIsWhite === "yes") {
        textColor = styles.white;
        borderColor = styles.white;
    } else {
        textColor = "";
        borderColor = "";
    }

    const label = props.label ? (
        <label className={styles.label} htmlFor={props.id}>
            {props.label}
        </label>
    ) : null;

    const icon = props.icon ? <img className={styles.icon} src={props.icon} alt={props.alt} /> : null;

    const element =
        props.element === "input" ? (
            <input
                id={props.id}
                className={`${styles.box} ${styles.input} ${textColor}`}
                name={props.name}
                type={props.type}
                placeholder={props.placeholder}
                autoComplete={props.autocomplete}
                value={inputState.value}
                onChange={changeHandler}
                onBlur={touchHandler}
            ></input>
        ) : (
            <textarea
                id={props.id}
                className={`${styles.box} ${styles.textarea}`}
                name={props.name}
                type={props.type}
                rows={props.rows || 3}
                placeholder={props.placeholder}
                autoComplete={props.autocomplete}
                value={inputState.value}
                onChange={changeHandler}
                onBlur={touchHandler}
            ></textarea>
        );

    return (
        <div
            className={`${styles.block} ${borderColor}
        ${!inputState.isValid && inputState.isTouched && styles.invalid}`}
        >
            {label}
            <div className={styles.wrapper}>
                {element}
                {icon}
            </div>
        </div>
    );
    // });
};

export default InputField;
