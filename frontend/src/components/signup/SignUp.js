import React, { useState } from "react";

// Static Images
import logo from "../../images/logo.png";

// Components
import InputField from "../inputField/inputField";

// Icons
import lastname from "../../images/lastname-icon.svg";
import password from "../../images/password-icon.svg";
import person from "../../images/person-icon.svg";
import email from "../../images/email-icon.svg";

// Styles
import "../../containers/home/Home.css";
import styles from "./Signup.module.css";

const SignUp = (props) => {
    const [inputFieldState /*, setInputFieldState*/] = useState([
        {
            id: "firstName",
            name: "firstName",
            type: "text",
            placeholder: "prénom",
            minLength: "2",
            maxLength: "45",
            icon: person,
            autocomplete: "given-name",
            alt: "first name icon",
        },
        {
            id: "lastName",
            name: "lastName",
            type: "text",
            placeholder: "nom",
            minLength: "2",
            maxLength: "45",
            icon: lastname,
            autocomplete: "family-name",
            alt: "last name icon",
        },
        {
            id: "email",
            name: "email",
            type: "email",
            placeholder: "email",
            minLength: "1",
            maxLength: "85",
            icon: email,
            autocomplete: "email",
            alt: "email icon",
        },
        {
            id: "password",
            name: "password",
            type: "text",
            placeholder: "password",
            minLength: "8",
            maxLength: "50",
            icon: password,
            autocomplete: "current-password",
            alt: "password icon",
        },
    ]);

    console.log(props);

    return (
        <div className="background_image">
            <img src={logo} className="logo" alt="Logo de Groupomania, entreprise de grand distribution européen" />
            <form className={styles.input_list}>
                <InputField
                    id={inputFieldState[0].id}
                    name={inputFieldState[0].name}
                    type={inputFieldState[0].type}
                    placeholder={inputFieldState[0].placeholder}
                    minLength={inputFieldState[0].minLength}
                    maxLength={inputFieldState[0].maxLength}
                    autocomplete={inputFieldState[0].autocomplete}
                    icon={inputFieldState[0].icon}
                    alt={inputFieldState[0].alt}
                />
                <InputField
                    id={inputFieldState[1].id}
                    name={inputFieldState[1].name}
                    type={inputFieldState[1].type}
                    placeholder={inputFieldState[1].placeholder}
                    minLength={inputFieldState[1].minLength}
                    maxLength={inputFieldState[1].maxLength}
                    autocomplete={inputFieldState[1].autocomplete}
                    icon={inputFieldState[1].icon}
                    alt={inputFieldState[1].alt}
                />
                <InputField
                    id={inputFieldState[2].id}
                    name={inputFieldState[2].name}
                    type={inputFieldState[2].type}
                    placeholder={inputFieldState[2].placeholder}
                    minLength={inputFieldState[2].minLength}
                    maxLength={inputFieldState[2].maxLength}
                    autocomplete={inputFieldState[2].autocomplete}
                    icon={inputFieldState[2].icon}
                    alt={inputFieldState[2].alt}
                />
                <InputField
                    id={inputFieldState[3].id}
                    name={inputFieldState[3].name}
                    type={inputFieldState[3].type}
                    placeholder={inputFieldState[3].placeholder}
                    minLength={inputFieldState[3].minLength}
                    maxLength={inputFieldState[3].maxLength}
                    autocomplete={inputFieldState[3].autocomplete}
                    icon={inputFieldState[3].icon}
                    alt={inputFieldState[3].alt}
                />
            </form>
            <div className="background_blur"></div>
            <p id="error_message" className={styles.error_message}>
                Error message à definir
            </p>
        </div>
    );
};

export default SignUp;