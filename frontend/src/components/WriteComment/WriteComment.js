import React, { useReducer, useEffect } from "react";
import { validate } from "../../utils/validators";

//Icons
import send from "../../images/send-icon.svg";

// Styles
import styles from "./WriteComment.module.css";

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
const WriteComment = (props) => {
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

    // console.log("inputState  =>", inputState);

    return (
        <div
            className={`
            ${styles.block} 
            ${!inputState.isValid && inputState.isTouched && styles.invalid}`}
        >
            <textarea
                id={props.id}
                className={styles.box}
                name={props.name}
                type={props.type}
                placeholder={props.placeholder}
                maxLength="255"
                rows={props.rows || 3}
                value={inputState.value}
                onChange={changeHandler}
                onBlur={touchHandler}
            ></textarea>
            <button form="comment-form" className={styles.btn} type="submit">
                <img className={styles.icon} src={send} alt={props.alt} />
            </button>
        </div>
    );
};

export default WriteComment;
