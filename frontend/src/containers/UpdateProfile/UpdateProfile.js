import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import { useHttpRequest } from "../../hooks/httpRequest-hook";
import { useForm } from "../../hooks/form-hook";
import { isEmail, MinLength, MaxLength } from "../../utils/validators";

// Static Images
import GenProfile from "../../images/generic_profile_picture.jpg";

// Icons
import password from "../../images/password-icon.svg";
import deleteIcon from "../../images/delete-icon.svg";

// Components
import UIBtn from "../../components/Buttons/UIBtn/UIBtn";
import InputField from "../../components/InputField/InputField";
import Spinner from "../../components/LoadingSpinner/LoadingSpinner";

// Styles
import styles from "./UpdateProfile.module.css";

const UpdateProfile = () => {
    // console.log("EDIT MODIFY");

    // Authentication context
    const auth = useContext(AuthContext);

    // Authentication context
    const history = useHistory();

    // Backend Request Hook
    const { isLoading, error, sendRequest, clearError } = useHttpRequest();

    //Profile Hook
    const [userDataState, setUserDataState] = useState();

    // console.log("userDataState:", userDataState);
    // Form Hook
    const [formState, inputHandler, setFormData] = useForm(
        {
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
    // console.log("formState:", formState.inputs.firstName);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await sendRequest(`http://localhost:4200/profile/${auth.userId}`, "GET", null, {
                    Authorization: "Bearer " + auth.token,
                });
                setUserDataState(userData);
                setFormData(
                    {
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
                        password: {
                            value: "",
                            isValid: false,
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
        try {
            await sendRequest(
                `http://localhost:4200/profile/update`,
                "PATCH",
                JSON.stringify({
                    id: auth.userId,
                    firstName: formState.inputs.firstName.value,
                    lastName: formState.inputs.lastName.value,
                    department: formState.inputs.department.value,
                    role: formState.inputs.role.value,
                    email: formState.inputs.email.value,
                    linkedin_url: formState.inputs.linkedin_url.value,
                }),
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + auth.token,
                }
            );
            history.push(`/profile/${auth.userId}`);
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

    console.log("error hook:", error);

    return (
        <div className={styles.container}>
            {!isLoading && userDataState && (
                <div className={styles.background_img}>
                    <div className={styles.wrapper}>
                        <img
                            src={userDataState.photo_url || GenProfile}
                            className={styles.profile_photo}
                            alt={`${userDataState.firstName} ${userDataState.lastName}, employé chez groupomania.`}
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
                                validators={[MinLength(2), MaxLength(45)]}
                                errorText="Votre email n'est pas correct"
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
                                validators={[MinLength(2), MaxLength(45)]}
                                errorText="Votre email n'est pas correct"
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
                                validators={[MinLength(2), MaxLength(65)]}
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
                                validators={[MinLength(2), MaxLength(65)]}
                                errorText="Veillez remplir la description du poste"
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
                            name="Mettre à jour mon profil"
                            type="submit"
                        />
                        <h4 className={styles.title}>Changer mot de passe</h4>
                        <form id="password-update-form" className={styles.update_list}>
                            <InputField
                                id="password"
                                label="Nouveau mot de passe :"
                                name="password"
                                type="password"
                                placeholder="Ecrivez votre nouveau mot de passe"
                                icon={password}
                                alt="password icon"
                                maxLength="50"
                                element="input"
                                hasLabel="yes"
                                textIsWhite="no"
                                validators={[MinLength(8), MaxLength(50)]}
                                errorText="Votre mot de passe n'est pas correct"
                                onInput={inputHandler}
                                initialValue={formState.inputs.password.value}
                                initialValid={formState.inputs.password.isValid}
                            />
                        </form>
                        <UIBtn
                            id="update-password-btn"
                            form="password-update-form"
                            name="Changer mon mot de passe"
                            type="submit"
                        />
                        <h4 className={styles.title}>Supprimer mon compte</h4>
                        <UIBtn id="delete-profile-btn" icon={deleteIcon} name="Supprimer" />
                        <p className={styles.role}>
                            Vous êtes sur le bord de supprimer votre compte. Toutes les informations liés à ce compte
                            seront supprimées.
                        </p>
                        <h5 className={styles.title}>Êtes-vous sur de supprimer votre compte?</h5>
                        <div className={styles.btn_block}>
                            <UIBtn id="accept-btn" name="Oui" type="submit" />
                            <UIBtn id="cancel-btn" name="Annuler" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateProfile;
