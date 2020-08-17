import React, { forwardRef, useImperativeHandle } from "react";

// Styles
import styles from "./InputField.module.css";

const InputField = forwardRef((props, ref) => {
    const [value, setValue] = React.useState("");

    const handleChange = (event) => {
        setValue(event.target.value);
        props.onChange(event.target.name, event.target.value);
    };

    const validate = () => {
        return true;
    };

    useImperativeHandle(ref, () => {
        return {
            validate: () => validate(),
        };
    });

    let textColor;
    if (props.textIsWhite === "yes") {
        textColor = styles.white;
    } else {
        textColor = "";
    }

    const label =
        props.hasLabel === "yes" ? (
            <label className={styles.label} htmlFor={props.id}>
                {props.name}
            </label>
        ) : null;

    const element =
        props.element === "input" ? (
            <input
                id={props.id}
                className={`${styles.box} ${textColor}`}
                name={props.name}
                onChange={(event) => handleChange(event)}
                type={props.type}
                value={props.value ? props.value : value}
                placeholder={props.placeholder}
                autoComplete={props.autocomplete}
            ></input>
        ) : (
            <textarea
                className={styles.box}
                id={props.id}
                name={props.name}
                type={props.type}
                rows={props.rows || 3}
                placeholder={props.placeholder}
                autoComplete={props.autocomplete}
                value={props.value ? props.value : value}
                onChange={(event) => handleChange(event)}
            ></textarea>
        );

    const icon = props.icon ? <img className={styles.icon} src={props.icon} alt={props.alt} /> : null;

    return (
        <div className={styles.block}>
            {label}
            <div className={styles.wrapper}>
                {element}
                {icon}
            </div>
        </div>
    );
});

export default InputField;
