import React, { useState } from "react";
import { Link } from "react-router-dom";

// Static Images
import logo from "../../images/logo.png";

// Icons
import password from "../../images/password-icon.svg";
import person from "../../images/person-icon.svg";

// Components
import InputField from "../Form components/inputField/InputField";

// Styles
import "../../containers/home/Home.css";

const Login = (props) => {
    const loginHandler = (event) => {
        event.preventDefault();
        console.log("input:", data);
        // const postData = (data) => {
        fetch("http://localhost:4200/login", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((token) => {
                console.log("token:", token);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        // };
    };

    const inputRefs = React.useRef([React.createRef(), React.createRef()]);

    const [data, setData] = useState({});

    // console.log("typed data :", data);

    const handleChange = (name, value) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const [inputFieldState /*, setInputFieldState*/] = useState([
        {
            id: "email",
            name: "email",
            type: "email",
            value: "",
            placeholder: "email",
            autocomplete: "email",
            icon: person,
            element: "input",
            hasLabel: "no",
            textIsWhite: "yes",
        },
        {
            id: "password",
            name: "password",
            type: "text",
            value: "",
            placeholder: "password",
            icon: password,
            autocomplete: "current-password",
            element: "input",
            hasLabel: "no",
            textIsWhite: "yes",
        },
    ]);

    return (
        <div className="background_image">
            <img src={logo} className="logo" alt="Logo de Groupomania, entreprise de grand distribution européen" />
            <form id="login-form" className="input_list" onSubmit={loginHandler}>
                <InputField
                    id={inputFieldState[0].id}
                    ref={inputRefs.current[0]}
                    name={inputFieldState[0].name}
                    type={inputFieldState[0].type}
                    onChange={handleChange}
                    placeholder={inputFieldState[0].placeholder}
                    autocomplete={inputFieldState[0].autocomplete}
                    icon={inputFieldState[0].icon}
                    element={inputFieldState[0].element}
                    hasLabel={inputFieldState[0].hasLabel}
                    textIsWhite={inputFieldState[0].textIsWhite}
                />
                <InputField
                    id={inputFieldState[1].id}
                    ref={inputRefs.current[1]}
                    name={inputFieldState[1].name}
                    type={inputFieldState[1].type}
                    onChange={handleChange}
                    placeholder={inputFieldState[1].placeholder}
                    minLength={inputFieldState[1].minLength}
                    maxLength={inputFieldState[1].maxLength}
                    autocomplete={inputFieldState[1].autocomplete}
                    icon={inputFieldState[1].icon}
                    element={inputFieldState[1].element}
                    hasLabel={inputFieldState[1].hasLabel}
                    textIsWhite={inputFieldState[1].textIsWhite}
                />
            </form>
            <p></p>
            <Link className="forgot_pass_link" to={"/login"}>
                mot de pass oublié ?
            </Link>
            <div className="background_blur"></div>
        </div>
    );
};

export default Login;
