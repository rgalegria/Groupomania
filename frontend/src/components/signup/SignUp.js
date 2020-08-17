import React from "react";

// Static Images
import logo from "../../images/logo.png";

// Components
import InputField from "../InputField/InputField";

// Icons
import lastname from "../../images/lastname-icon.svg";
import password from "../../images/password-icon.svg";
import person from "../../images/person-icon.svg";
import email from "../../images/email-icon.svg";

// Styles
import "../../containers/Home/Home.css";
import styles from "./Signup.module.css";

const SignUp = (props) => {
    return (
        <div className="background_image">
            <img src={logo} className="logo" alt="Logo de Groupomania, entreprise de grand distribution européen" />
            <form id="signup-form" className={styles.input_list}>
                <InputField
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="prénom"
                    autocomplete="given-name"
                    icon={person}
                    alt="first name icon"
                />
                <InputField
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="nom"
                    autocomplete="family-name"
                    icon={lastname}
                    alt="last name icon"
                />
                <InputField
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email"
                    autocomplete="email"
                    icon={email}
                    alt="email icon"
                />
                <InputField
                    id="password"
                    name="password"
                    type="text"
                    placeholder="password"
                    autocomplete="current-password"
                    icon={password}
                    alt="password icon"
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
