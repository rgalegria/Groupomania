import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import { useHttpRequest } from "../../hooks/httpRequest-hook";

// Static Images
import dude from "../../images/dude.jpg";
import GenProfile from "../../images/generic_profile_picture.jpg";

// Icons
import LinkedinIcon from "../../images/linkedin-icon.svg";

// Components
import Counter from "../../components/Counter/Counter";

// Styles
import styles from "./UserProfile.module.css";

const UserProfile = () => {
    console.log("userprofile");

    // const auth = useContext(AuthContext);

    // const { isLoading, error, sendRequest, clearError } = useHttpRequest();

    // const [userData, setUserData] = useState([]);

    // const paramId = useParams().id;

    // console.log("Param ID:", paramId);

    //Fetch Data
    // useEffect(() => {
    //     console.log("test");
    //     const fetchUser = async () => {
    //         try {
    //             const userData = await sendRequest(`http://localhost:4200/profile/${2}`, "GET", null, {
    //                 Authorization: "Bearer " + auth.token,
    //             });
    //             setUserData(userData);
    //         } catch (err) {}
    //     };
    //     fetchUser();
    // }, []);

    // console.log("user Data", userData);
    // {
    //     id: 2,
    //     user_created: "2020-03-07T10:55:15.000Z",
    //     firstName: "Jean",
    //     lastName: "DUPONT",
    //     email: "j.dupont@groupomania.fr",
    //     password: "123456",
    //     photo_url: dude,
    //     department: "Gestion de la Relation Client",
    //     role: "Chargé de l’implementation du système CRM SalesForce",
    //     linkedin_url: "https://www.linkedin.com/",
    //     postsCount: 56,
    //     likesCount: 15,
    // },

    return (
        <div className={styles.container}>
            {/* <div className={styles.background_img}></div>
            <div className={styles.background_dim}></div>
            <div className={styles.wrapper}>
                <img
                    src={userData[0].photo_url || GenProfile}
                    className={styles.profile_photo}
                    alt={`${userData[0].firstName} ${userData[0].lastName}, employé chez groupomania.`}
                />
                <div className={styles.hero_block}>
                    <h1 className={styles.title}>
                        {userData[0].firstName} {userData[0].lastName}
                    </h1>
                    <a href={userData[0].linkedin_url} target="_blank">
                        <img
                            className={styles.Linkedin_icon}
                            src={LinkedinIcon}
                            alt="Logo du reseaux social linkedin"
                        />
                    </a>
                </div>
                <p className={styles.department}>{userData[0].department}</p>
                <p className={styles.role}>{userData[0].role}</p>
                <a className={styles.email} href={`mailto:${userData[0].email}`}>
                    {userData[0].email}
                </a>
                <Counter likesCount={userData[0].likesCount || 0} postsCount={userData[0].postsCount || 0} />
            </div> */}
        </div>
    );
};

export default UserProfile;
