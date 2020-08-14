import React, { useState } from "react";
import { Link } from "react-router-dom";

// Static Images
import logo from "../../images/logo.png";

// Components
import InputField from "../inputField/inputField";

// Icons
import password from "../../images/password-icon.svg";
import person from "../../images/person-icon.svg";

// Styles
import "../../containers/home/Home.css";

const Login = (props) => {
    const [inputFieldState /*, setInputFieldState*/] = useState([
        {
            id: "email",
            name: "email",
            type: "email",
            placeholder: "email",
            minLength: "1",
            maxLength: "85",
            icon: person,
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

    return (
        <div className="background_image">
            <img src={logo} className="logo" alt="Logo de Groupomania, entreprise de grand distribution européen" />
            <form className="input_list">
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
            </form>
            <Link className="forgot_pass_link" href="#">
                mot de pass oublié ?
            </Link>
            <div className="background_blur"></div>
        </div>
    );
};

export default Login;
