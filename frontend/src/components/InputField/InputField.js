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

    // const clearInput = () => {
    //     document.getElementById({ id }).value = "";
    // };

    let typeOfBox;
    let borderColor;

    if (props.textIsWhite === "yes") {
        typeOfBox = styles.white_box;
        borderColor = styles.border_white;
    } else {
        typeOfBox = styles.box;
        borderColor = "";
    }

    const label = props.label ? (
        <label className={styles.label} htmlFor={props.id}>
            {props.label}
        </label>
    ) : null;

    let icon;

    if (props.icon && props.textIsWhite === "yes") {
        icon = <img className={`${styles.icon} icon_white`} src={props.icon} alt={props.alt} />;
    } else if (props.icon) {
        icon = <img className={styles.icon} src={props.icon} alt={props.alt} />;
    } else {
        icon = "";
    }

    const element =
        props.element === "input" ? (
            <input
                id={props.id}
                className={`${typeOfBox} ${styles.input_height} `}
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
                className={`${typeOfBox} ${styles.textarea}`}
                name={props.name}
                type={props.type}
                rows={props.rows || 3}
                placeholder={props.placeholder}
                autoComplete={props.autocomplete}
                value={inputState.value}
                // onClear={clearInput}
                onChange={changeHandler}
                onBlur={touchHandler}
            />
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
