import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "../../hooks/form-hook";
import { useHttpRequest } from "../../hooks/httpRequest-hook";
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

    // Request Hook
    const { error, sendRequest } = useHttpRequest();

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

        if (!formState.isValid) {
            return;
        }

        try {
            const data = {
                email: formState.inputs.email.value,
                password: formState.inputs.password.value,
            };

            const responseData = await sendRequest(
                `${process.env.REACT_APP_API_URL}/login`,
                "POST",
                JSON.stringify(data),
                {
                    "Content-Type": "application/json",
                }
            );
            auth.login(responseData.userId, responseData.token, responseData.account);
            history.push("/posts");
        } catch (err) {}
    };

    return (
        <>
            <div className="background_image">
                <img
                    src={logo}
                    className="logo"
                    alt="Logo de Groupomania, entreprise de grande distribution européenne"
                />
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
                        type="password"
                        onInput={inputHandler}
                        placeholder="mot de passe"
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
                <p className="error_message">{error}</p>
                <Link className="forgot_pass_link" to={"/login"}>
                    mot de passe oublié ?
                </Link>
            </div>
            <div className="background_blur"></div>
        </>
    );
};

export default Login;
