import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "../../hooks/form-hook";
import { AuthContext } from "../../context/auth-context";
import { isEmail, MinLength } from "../../utils/validators";

// Static Images
import logo from "../../images/logo.png";

// Icons
import password from "../../images/password-icon.svg";
import person from "../../images/person-icon.svg";

// Components
import InputField from "../../components/InputField/InputField";

// Styles
import "../Home/Home.css";

const Login = () => {
    // Authentication context
    const auth = useContext(AuthContext);

    // History context
    const history = useHistory();

    // Input Hook
    const [formState, inputHandler] = useForm(
        {
            email: {
                value: "",
                isValid: false,
            },
            password: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    const loginHandler = async (event) => {
        event.preventDefault();

        const data = {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
        };

        await fetch("http://localhost:4200/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((responseData) => {
                auth.login(responseData.userId, responseData.token, responseData.account);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        history.push("/posts");
    };

    return (
        <div className="background_image">
            <img src={logo} className="logo" alt="Logo de Groupomania, entreprise de grand distribution européen" />
            <form id="login-form" className="input_list" onSubmit={loginHandler}>
                <InputField
                    id="email"
                    name="email"
                    type="email"
                    onInput={inputHandler}
                    placeholder="email"
                    autocomplete="email"
                    icon={person}
                    alt="email icon"
                    element="input"
                    hasLabel="no"
                    textIsWhite="yes"
                    validators={[isEmail(), MinLength(6)]}
                    errorText="Votre email n'est pas correct"
                    initialValue={formState.inputs.email.value}
                    initialValid={formState.inputs.email.isValid}
                />
                <InputField
                    id="password"
                    name="password"
                    type="text"
                    onInput={inputHandler}
                    placeholder="password"
                    autocomplete="current-password"
                    icon={password}
                    alt="password icon"
                    element="input"
                    hasLabel="no"
                    textIsWhite="yes"
                    validators={[MinLength(8)]}
                    errorText="Votre mot de passe n'est pas correct"
                    initialValue={formState.inputs.password.value}
                    initialValid={formState.inputs.password.isValid}
                />
            </form>
            <Link className="forgot_pass_link" to={"/login"}>
                mot de pass oublié ?
            </Link>
            <div className="background_blur"></div>
        </div>
    );
};

export default Login;
