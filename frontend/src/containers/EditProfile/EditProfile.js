import React, { useState } from "react";

// Static Images
import dude from "./images/dude.jpg";

// Components
import Btn from "./components/btn/btn";
import NavBtn from "./components/btn_nav/btn_nav";
import UpdateField from "./components/updateField/UpdateField";
// import Counter from "./components/counter";

// Icons
import signup from "./images/signup-icon.svg";
import person from "./images/person-icon.svg";
import password from "./images/password-icon.svg";
import back from "./images/back-icon.svg";
import modify from "./images/modify-icon.svg";
import email from "./images/email-icon.svg";
import lastName from "./images/lastname-icon.svg";
import deleteIcon from "./images/delete-icon.svg";
// import close from "./images/close-icon.svg";
// import logout from "./images/logout-icon.svg";
// import accountDelete from "./images/delete-icon.svg";

// Styles
import "./UserProfile.css";

const UserProfile = (props) => {
    const [usersState /*, setUsersState*/] = useState([
        {
            id: 2,
            user_created: "2020-03-07T10:55:15.000Z",
            firstName: "Jean",
            lastName: "DUPONT",
            email: "j.dupont@groupomania.fr",
            photo_url: dude,
            department: "Gestion de la Relation Client",
            role: "Chargé de l'implementation de SalesForce",
            linkedin_url: "https://www.linkedin.com/jeandupont",
        },
    ]);

    const [btnsState /*, setBtnsState*/] = useState([
        {
            id: "updateProfile-btn",
            name: "Mettre à jour mon profil",
            type: "submit",
        },
        {
            id: "updatePassword-btn",
            name: "Changer mon mot de passe",
            type: "submit",
        },
        {
            id: "delete-btn",
            name: "Supprimer",
            icon: deleteIcon,
            type: "submit",
        },
        {
            id: "accept-btn",
            name: "Oui",
            type: "submit",
        },
        {
            id: "cancel-btn",
            name: "Annuler",
            type: "submit",
        },
        {
            id: "back-btn",
            name: "retourner",
            icon: back,
            type: "submit",
        },
        {
            id: "modify-btn",
            name: "modifier",
            icon: modify,
            type: "submit",
        },
    ]);

    const [inputFieldState /*, setInputFieldState*/] = useState([
        {
            id: "firstName",
            name: "Prénom :",
            type: "text",
            placeholder: "Prénom",
            minLength: "2",
            maxLength: "45",
            // icon: person,
            // autocomplete: "given-name",
            // alt: "first name icon",
        },
        {
            id: "lastName",
            name: "Nom :",
            type: "text",
            placeholder: "Nom",
            minLength: "2",
            maxLength: "45",
            // icon: lastName,
            // autocomplete: "family-name",
            // alt: "last name icon",
        },
        {
            id: "department",
            name: "Département :",
            type: "text",
            placeholder: "Département",
            minLength: "1",
            maxLength: "85",
            // icon: email,
            // autocomplete: "email",
            // alt: "email icon",
        },
        {
            id: "post",
            name: "Poste :",
            type: "text",
            placeholder: "Poste",
            minLength: "1",
            maxLength: "85",
            // icon: email,
            // autocomplete: "email",
            // alt: "email icon",
        },
        {
            id: "email",
            name: "E-mail",
            type: "email",
            placeholder: "E-mail",
            minLength: "1",
            maxLength: "85",
            // icon: email,
            // autocomplete: "email",
            // alt: "email icon",
        },
        {
            id: "linkedin",
            name: "Linkedin (facultatif) :",
            type: "text",
            placeholder: "https://www.linkedin.com/votreprofil",
            minLength: "1",
            // maxLength: "85",
            // icon: email,
            // autocomplete: "email",
            // alt: "email icon",
        },
        {
            id: "password",
            name: "Nouveau mot de passe :",
            type: "text",
            placeholder: "Mot de passe",
            minLength: "8",
            maxLength: "50",
            icon: password,
            // autocomplete: "current-password",
            alt: "password icon",
        },
    ]);

    const [counterState /*, setCounterState*/] = useState([
        {
            postsCount: 56,
            likesCount: 15,
        },
    ]);

    return (
        <div className="Login">
            {/* Profile page */}

            {/* <main className="container">
                <div className="background"></div>
                <div className="background_dim"></div>
                <div className="wrapper">
                    <img
                        src={usersState[0].photo_url}
                        className="profile_photo"
                        alt="Logo de Groupomania, entreprise de grand distribution européen"
                    />
                    <h1 className="title">
                        {usersState[0].firstName} {usersState[0].lastName}
                    </h1>
                    <p className="department">{usersState[0].department}</p>
                    <p className="role">{usersState[0].role}</p>
                    <a className="email" href="#">
                        {usersState[0].email}
                    </a>

                    <Counter likesCount={counterState[0].likesCount} postsCount={counterState[0].postsCount} />
                </div>
                </main>
            <div className="btn-list">
                <NavBtn id={btnsState[0].id} icon={btnsState[0].icon} name={btnsState[0].name} />
                <NavBtn
                    id={btnsState[1].id}
                    icon={btnsState[1].icon}
                    name={btnsState[1].name}
                    type={btnsState[0].type}
                />
            </div> */}

            {/* Modify Profile page */}

            <main className="container">
                <div className="background"></div>
                <div className="background_dim"></div>
                <div className="wrapper">
                    <img
                        src={usersState[0].photo_url}
                        className="profile_photo"
                        alt="Logo de Groupomania, entreprise de grand distribution européen"
                    />
                    <h4 className="title">Vos informations personnelles</h4>

                    <form className="update-list">
                        <UpdateField
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
                        <UpdateField
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
                        <UpdateField
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
                        <UpdateField
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
                        <UpdateField
                            id={inputFieldState[4].id}
                            name={inputFieldState[4].name}
                            type={inputFieldState[4].type}
                            placeholder={inputFieldState[4].placeholder}
                            minLength={inputFieldState[4].minLength}
                            maxLength={inputFieldState[4].maxLength}
                            autocomplete={inputFieldState[4].autocomplete}
                            icon={inputFieldState[4].icon}
                            alt={inputFieldState[4].alt}
                        />
                        <UpdateField
                            id={inputFieldState[5].id}
                            name={inputFieldState[5].name}
                            type={inputFieldState[5].type}
                            placeholder={inputFieldState[5].placeholder}
                            minLength={inputFieldState[5].minLength}
                            maxLength={inputFieldState[5].maxLength}
                            autocomplete={inputFieldState[5].autocomplete}
                            icon={inputFieldState[5].icon}
                            alt={inputFieldState[5].alt}
                        />
                    </form>
                    <Btn id={btnsState[0].id} name={btnsState[0].name} type={btnsState[0].type} />
                    <h4 className="title">Changer mot de passe</h4>
                    <form className="update-list">
                        <UpdateField
                            id={inputFieldState[6].id}
                            name={inputFieldState[6].name}
                            type={inputFieldState[6].type}
                            placeholder={inputFieldState[6].placeholder}
                            minLength={inputFieldState[6].minLength}
                            maxLength={inputFieldState[6].maxLength}
                            autocomplete={inputFieldState[6].autocomplete}
                            icon={inputFieldState[6].icon}
                            alt={inputFieldState[6].alt}
                        />
                    </form>
                    <Btn id={btnsState[1].id} name={btnsState[1].name} type={btnsState[1].type} />
                    <h4 className="title">Supprimer mon compte</h4>
                    <Btn
                        id={btnsState[2].id}
                        icon={btnsState[2].icon}
                        name={btnsState[2].name}
                        type={btnsState[2].type}
                    />
                    <p className="role">
                        Vous êtes sur le bord de supprimer votre compte. Toutes les informations liés à ce compte seront
                        supprimées.
                    </p>
                    <h5 className="title">Êtes-vous sur de supprimer votre compte?</h5>
                    <div className="btn-block">
                        <Btn id={btnsState[3].id} name={btnsState[3].name} type={btnsState[3].type} className="test" />

                        <Btn id={btnsState[4].id} name={btnsState[4].name} type={btnsState[4].type} className="test" />
                    </div>
                </div>
            </main>
            <div className="btn-list">
                <NavBtn id={btnsState[5].id} icon={btnsState[5].icon} name={btnsState[5].name} />
                <NavBtn
                    id={btnsState[6].id}
                    icon={btnsState[6].icon}
                    name={btnsState[6].name}
                    type={btnsState[6].type}
                />
            </div>
        </div>
    );
};

export default UserProfile;
