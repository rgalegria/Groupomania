import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import { useHttpRequest } from "../../hooks/httpRequest-hook";
import { useForm } from "../../hooks/form-hook";
import { isEmail, MinLength, MaxLength, isText } from "../../utils/validators";

// Icons
import password from "../../images/password-icon.svg";
import deleteIcon from "../../images/delete-icon.svg";

// Components
import ErrorModal from "../../components/ErrorModal/ErrorModal";
import UIBtn from "../../components/Buttons/UIBtn/UIBtn";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import InputField from "../../components/InputField/InputField";
import Spinner from "../../components/LoadingSpinner/LoadingSpinner";

// Styles
import styles from "./UpdateProfile.module.css";

const UpdateProfile = () => {
    // console.log("EDIT MODIFY");

    // Authentication context
    const auth = useContext(AuthContext);

    // History context
    const history = useHistory();

    // Backend Request Hook
    const { isLoading, error, sendRequest, clearError } = useHttpRequest();

    // Profile useState
    const [userDataState, setUserDataState] = useState();

    // Delete message useState
    const [showInfo, setShowInfo] = useState(false);

    // Form useState
    const [formState, inputHandler, setFormData] = useForm(
        {
            image: {
                value: null,
                isValid: false,
            },
            firstName: {
                value: "",
                isValid: false,
            },
            lastName: {
                value: "",
                isValid: false,
            },
            department: {
                value: "",
                isValid: false,
            },
            role: {
                value: "",
                isValid: false,
            },
            email: {
                value: "",
                isValid: false,
            },
            linkedin_url: {
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

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await sendRequest(
                    `${process.env.REACT_APP_API_URL}/profile/${auth.userId}`,
                    "GET",
                    null,
                    {
                        Authorization: "Bearer " + auth.token,
                    }
                );
                setUserDataState(userData);
                setFormData(
                    {
                        image: {
                            value: userData.photo_url,
                            isValid: false,
                        },
                        firstName: {
                            value: userData.firstName,
                            isValid: true,
                        },
                        lastName: {
                            value: userData.lastName,
                            isValid: true,
                        },
                        department: {
                            value: userData.department,
                            isValid: true,
                        },
                        role: {
                            value: userData.role,
                            isValid: true,
                        },
                        email: {
                            value: userData.email,
                            isValid: true,
                        },
                        linkedin_url: {
                            value: userData.linkedin_url,
                            isValid: true,
                        },
                    },
                    true
                );
            } catch (err) {}
        };
        fetchUser();
    }, [sendRequest, auth.userId, auth.token, setFormData]);

    const updateProfileHandler = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("image", formState.inputs.image.value);
        formData.append("firstName", formState.inputs.firstName.value);
        formData.append("lastName", formState.inputs.lastName.value);
        formData.append("department", formState.inputs.department.value);
        formData.append("role", formState.inputs.role.value);
        formData.append("email", formState.inputs.email.value);
        formData.append("linkedin_url", formState.inputs.linkedin_url.value);
        try {
            await sendRequest(`${process.env.REACT_APP_API_URL}/profile/update`, "PATCH", formData, {
                Authorization: "Bearer " + auth.token,
            });
            history.push(`/profile/${auth.userId}`);
        } catch (err) {}
    };

    const updatePasswordHandler = async (event) => {
        event.preventDefault();
        // console.log("password =>", formState.inputs.password.value);
        try {
            await sendRequest(
                `${process.env.REACT_APP_API_URL}/profile/update`,
                "PUT",
                JSON.stringify({
                    password: formState.inputs.password.value,
                }),
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + auth.token,
                }
            );
            // history.push(`/profile/${auth.userId}`);
        } catch (err) {}
    };

    const showDeleteMessage = (event) => {
        event.preventDefault();
        if (showInfo === false) {
            setShowInfo(true);
        } else {
            setShowInfo(false);
        }
    };

    const deleteUserHandler = async (event) => {
        event.preventDefault();

        try {
            await sendRequest(`${process.env.REACT_APP_API_URL}/profile/${auth.userId}`, "DELETE", null, {
                "Content-Type": "application/json",
                Authorization: "Bearer " + auth.token,
            });
            auth.logout();
            history.push(`/`);
        } catch (err) {}
    };

    if (isLoading) {
        return (
            <div className={styles.container}>
                <div className="spinner">
                    <Spinner />
                </div>
            </div>
        );
    }

    if (!userDataState) {
        return (
            <div className={styles.container}>
                <h2>No User Data!</h2>
            </div>
        );
    }

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            <div className={`container ${styles.class_mod}`}>
                {!isLoading && userDataState && (
                    <>
                        <div className={styles.wrapper}>
                            <div className={styles.background_img}></div>
                            <ImageUpload
                                center
                                id="image"
                                onInput={inputHandler}
                                errorText="Choisisez une image"
                                photo_url={userDataState.photo_url}
                            />
                            <h4 className={styles.title}>Vos informations personnelles</h4>
                            <form id="update-form" className={styles.update_list} onSubmit={updateProfileHandler}>
                                <InputField
                                    id="firstName"
                                    label="Prénom :"
                                    name="firstName"
                                    type="text"
                                    placeholder="Votre prénom"
                                    autocomplete="given-name"
                                    maxLength="45"
                                    element="input"
                                    hasLabel="yes"
                                    textIsWhite="no"
                                    validators={[MinLength(2), MaxLength(45), isText()]}
                                    errorText="Veillez rentrer votre prénom"
                                    onInput={inputHandler}
                                    initialValue={userDataState.firstName}
                                    initialValid={true}
                                />
                                <InputField
                                    id="lastName"
                                    label="Nom :"
                                    name="lastName"
                                    type="text"
                                    placeholder="Votre nom"
                                    autocomplete="family-name"
                                    maxLength="45"
                                    element="input"
                                    hasLabel="yes"
                                    textIsWhite="no"
                                    validators={[MinLength(2), MaxLength(45), isText()]}
                                    errorText="Veillez rentrer votre nom de famille"
                                    onInput={inputHandler}
                                    initialValue={userDataState.lastName}
                                    initialValid={true}
                                />
                                <InputField
                                    id="department"
                                    label="Departement :"
                                    name="department"
                                    type="text"
                                    placeholder="Votre departement"
                                    maxLength="65"
                                    element="input"
                                    hasLabel="yes"
                                    textIsWhite="no"
                                    validators={[MinLength(2), MaxLength(65), isText()]}
                                    errorText="Veillez remplir le departement auquel vous appartenez"
                                    onInput={inputHandler}
                                    initialValue={userDataState.department}
                                    initialValid={true}
                                />
                                <InputField
                                    id="role"
                                    label="Description poste :"
                                    name="role"
                                    type="text"
                                    placeholder="Description du poste"
                                    maxLength="65"
                                    element="textarea"
                                    hasLabel="yes"
                                    textIsWhite="no"
                                    validators={[MinLength(2), MaxLength(65), isText()]}
                                    errorText="Veillez remplir la description de votre poste"
                                    onInput={inputHandler}
                                    initialValue={userDataState.role}
                                    initialValid={true}
                                />
                                <InputField
                                    id="email"
                                    label="E-mail :"
                                    name="email"
                                    type="email"
                                    placeholder="Votre e-mail"
                                    autocomplete="email"
                                    maxLength="100"
                                    element="input"
                                    hasLabel="yes"
                                    textIsWhite="no"
                                    validators={[isEmail(), MinLength(6), MaxLength(100)]}
                                    errorText="Votre email n'est pas correct"
                                    onInput={inputHandler}
                                    initialValue={userDataState.email}
                                    initialValid={true}
                                />
                                <InputField
                                    id="linkedin_url"
                                    label="Linkedin (facultatif) :"
                                    name="linkedin"
                                    type="text"
                                    placeholder="Votre addresse Linkedin"
                                    element="input"
                                    hasLabel="yes"
                                    textIsWhite="no"
                                    validators={[]}
                                    onInput={inputHandler}
                                    initialValue={userDataState.linkedin_url}
                                    initialValid={true}
                                />
                            </form>
                            <UIBtn
                                id="update-profile-btn"
                                form="update-form"
                                name="Mettre à jour profil"
                                type="submit"
                                btnType="valid"
                            />
                            <h4 className={styles.title}>Changer mot de passe</h4>
                            <form
                                id="update-password-form"
                                className={styles.update_list}
                                onSubmit={updatePasswordHandler}
                            >
                                <InputField
                                    id="password"
                                    label="Mot de passe :"
                                    name="password"
                                    type="password"
                                    placeholder="Votre nouveau mot de passe"
                                    icon={password}
                                    alt="password icon"
                                    maxLength="50"
                                    element="input"
                                    hasLabel="yes"
                                    textIsWhite="no"
                                    validators={[MinLength(8), MaxLength(50)]}
                                    errorText="Minimum une mayuscule, un chiffre et 8 charactères"
                                    onInput={inputHandler}
                                    initialValue={formState.inputs.password.value}
                                    initialValid={formState.inputs.password.isValid}
                                />
                            </form>
                            <UIBtn
                                id="update-password-btn"
                                form="update-password-form"
                                name="Changer mot de passe"
                                type="submit"
                                btnType="valid"
                            />
                            <h4 className={styles.title}>Supprimer mon compte</h4>
                            <UIBtn
                                id="delete-profile-btn"
                                icon={deleteIcon}
                                name="Supprimer"
                                onClick={showDeleteMessage}
                                btnType="warning"
                            />
                            <div style={{ display: showInfo === true ? "block" : "none" }}>
                                <p className={styles.role}>
                                    Vous êtes sur le bord de supprimer votre compte. Toutes les informations liés à ce
                                    compte seront supprimées.
                                </p>
                                <h5 className={styles.title}>Êtes-vous sur de supprimer votre compte?</h5>
                                <div className={styles.btn_block}>
                                    <UIBtn
                                        id="accept-btn"
                                        name="Oui"
                                        type="submit"
                                        onClick={deleteUserHandler}
                                        btnType="warning"
                                    />
                                    <UIBtn
                                        id="cancel-btn"
                                        name="Annuler"
                                        onClick={showDeleteMessage}
                                        btnType="cancel"
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default UpdateProfile;
