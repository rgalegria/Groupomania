import React, { useContext } from "react";
import { useForm } from "../../hooks/form-hook";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import { useHttpRequest } from "../../hooks/httpRequest-hook";
import { isEmail, MinLength, isText } from "../../utils/validators";

// Static Images
import logo from "../../images/logo.png";

// Icons
import lastname from "../../images/lastname-icon.svg";
import password from "../../images/password-icon.svg";
import person from "../../images/person-icon.svg";
import email from "../../images/email-icon.svg";

// Components
import InputField from "../../components/InputField/InputField";

// Styles
import "../../containers/Home/Home.css";
import styles from "./Signup.module.css";

const SignUp = () => {
    // Authentication context
    const auth = useContext(AuthContext);

    // History context
    const history = useHistory();

    const [formState, inputHandler] = useForm(
        {
            firstName: {
                value: "",
                isValid: false,
            },
            lastName: {
                value: "",
                isValid: false,
            },
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

    // Request Hook
    const { error, sendRequest } = useHttpRequest();

    const signupHandler = async (event) => {
        event.preventDefault();

        if (!formState.isValid) {
            return;
        }

        try {
            const data = {
                firstName: formState.inputs.firstName.value,
                lastName: formState.inputs.lastName.value.toUpperCase(),
                email: formState.inputs.email.value,
                password: formState.inputs.password.value,
            };

            const responseData = await sendRequest(
                `${process.env.REACT_APP_API_URL}/signup`,
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
                <img src={logo} className="logo" alt="Logo de Groupomania, entreprise de grand distribution européen" />
                <form id="signup-form" className={styles.input_list} onSubmit={signupHandler}>
                    <InputField
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="prénom"
                        autocomplete="given-name"
                        icon={person}
                        alt="first name icon"
                        element="input"
                        hasLabel="no"
                        textIsWhite="yes"
                        validators={[MinLength(2), isText()]}
                        errorText="Veuillez rentrer uniquement des lettres"
                        onInput={inputHandler}
                        initialValue={formState.inputs.firstName.value}
                        initialValid={formState.inputs.firstName.isValid}
                    />
                    <InputField
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder="nom"
                        autocomplete="family-name"
                        icon={lastname}
                        alt="last name icon"
                        element="input"
                        hasLabel="no"
                        textIsWhite="yes"
                        validators={[MinLength(2), isText()]}
                        errorText="Veuillez rentrer uniquement des lettres"
                        onInput={inputHandler}
                        initialValue={formState.inputs.lastName.value}
                        initialValid={formState.inputs.lastName.isValid}
                    />
                    <InputField
                        id="email"
                        name="email"
                        type="email"
                        placeholder="email"
                        autocomplete="email"
                        icon={email}
                        alt="email icon"
                        element="input"
                        hasLabel="no"
                        textIsWhite="yes"
                        validators={[isEmail(), MinLength(6)]}
                        errorText="Votre email n'est pas correct"
                        onInput={inputHandler}
                        initialValue={formState.inputs.email.value}
                        initialValid={formState.inputs.email.isValid}
                    />
                    <InputField
                        id="password"
                        name="password"
                        type="password"
                        placeholder="mot de passe"
                        autocomplete="current-password"
                        icon={password}
                        alt="password icon"
                        element="input"
                        hasLabel="no"
                        textIsWhite="yes"
                        validators={[MinLength(8)]}
                        errorText="Minimum une majuscule, un chiffre et 8 lettres"
                        onInput={inputHandler}
                        initialValue={formState.inputs.password.value}
                        initialValid={formState.inputs.password.isValid}
                    />
                </form>
                <p className="error_message">{error}</p>
            </div>
            <div className="background_blur"></div>
        </>
    );
};

export default SignUp;
