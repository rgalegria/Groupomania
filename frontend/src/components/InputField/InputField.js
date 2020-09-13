import React, { useReducer, useEffect } from "react";
import { validate } from "../../utils/validators";

// Styles
import styles from "./InputField.module.css";

// En fonction de l'etat de l'objet html (change = ecriture / touch = utilisateur change de champ)
const inputReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE":
            return {
                // coppier tous les valeurs d'avant et ajoute le nouveau événement (une lettre par exemple)
                ...state,
                value: action.val,
                // changer la validation en fonction des validateurs de l'objet html
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
    // état initielle du composant
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue || "",
        isTouched: false,
        isValid: props.initialValid || false,
    });

    // déconstruction de props et inputState
    const { id, onInput } = props;
    const { value, isValid } = inputState;

    // id du composant, la valeur capturée et sa validation de donnés
    useEffect(() => {
        onInput(id, value, isValid);
    }, [id, value, isValid, onInput]);

    // Fonction pour capturer le changement de l'état du composant (écriture)
    const changeHandler = (event) => {
        dispatch({
            type: "CHANGE",
            val: event.target.value,
            validators: props.validators,
        });
    };

    // Fonction pour capturer le changement de l'état du composant (changer de champ)
    const touchHandler = () => {
        dispatch({
            type: "TOUCH",
        });
    };

    // Validation visuelle et type d'objet html (input/textarea)
    let typeOfBox;
    let borderColor;

    if (props.textIsWhite === "yes") {
        typeOfBox = styles.white_box;
        borderColor = styles.border_white;
    } else {
        typeOfBox = styles.box;
        borderColor = "";
    }

    // si on souhaite un champ label
    const label = props.label ? (
        <label className={styles.label} htmlFor={props.id}>
            {props.label}
        </label>
    ) : null;

    // si on souhaite un icône à coté du champ
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
                onChange={changeHandler}
                onBlur={touchHandler}
            />
        );

    return (
        <>
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
            {!inputState.isValid && inputState.isTouched && <p className={styles.input_error}>{props.errorText}</p>}
        </>
    );
    // });
};

export default InputField;
