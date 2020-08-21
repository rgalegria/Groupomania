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
    if (props.textIsWhite === "yes") {
        textColor = styles.white;
    } else {
        textColor = "";
    }

    const label = props.label ? (
        <label className={styles.label} htmlFor={props.id}>
            {props.label}
        </label>
    ) : null;

    const element =
        props.element === "input" ? (
            <input
                id={props.id}
                className={`${styles.box} ${textColor}`}
                name={props.name}
                type={props.type}
                placeholder={props.placeholder}
                // minLength="1"
                // maxLength="45"
                autoComplete={props.autocomplete}
                value={inputState.value}
                onChange={changeHandler}
                onBlur={touchHandler}
                // value={props.value ? props.value : value}
                // onChange={(event) => changeHandler(event)}
            ></input>
        ) : (
            <textarea
                id={props.id}
                className={styles.box}
                name={props.name}
                type={props.type}
                rows={props.rows || 3}
                placeholder={props.placeholder}
                // minLength="1"
                // maxLength="60"
                autoComplete={props.autocomplete}
                value={inputState.value}
                onChange={changeHandler}
                onBlur={touchHandler}
                // value={props.value ? props.value : value}
                // onChange={(event) => changeHandler(event)}
            ></textarea>
        );

    const icon = props.icon ? <img className={styles.icon} src={props.icon} alt={props.alt} /> : null;

    return (
        <div className={`${styles.block} ${!inputState.isValid && inputState.isTouched && styles.invalid}`}>
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
