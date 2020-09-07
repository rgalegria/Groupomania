import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useHttpRequest } from "../../hooks/httpRequest-hook";
import { AuthContext } from "../../context/auth-context";

// Static Images
import GenProfile from "../../images/generic_profile_picture.jpg";

// Icons
import LinkedinIcon from "../../images/linkedin-icon.svg";

// Components
import Counter from "../../components/Counter/Counter";
import Spinner from "../../components/LoadingSpinner/LoadingSpinner";

// Styles
import styles from "./UserProfile.module.css";

const UserProfile = () => {
    // console.log("USER PROFILE");

    // Authentication context
    const auth = useContext(AuthContext);

    // Backend Request Hook
    const { isLoading, /*error,*/ sendRequest /*clearError*/ } = useHttpRequest();

    //Profile Hook
    const [profileData, setProfileData] = useState();

    const userId = useParams().id;

    useEffect(() => {
        // console.log("useEFFECT");
        const fetchUser = async () => {
            try {
                // console.log("FETCHING");
                const userData = await sendRequest(`http://localhost:4200/profile/${userId}`, "GET", null, {
                    Authorization: "Bearer " + auth.token,
                });
                // console.log("BACKEND Data:", userData);
                setProfileData(userData);
                // console.log("REACT Data:", profileData);
            } catch (err) {}
        };
        fetchUser();
    }, []);

    if (isLoading) {
        return (
            <div className={styles.container}>
                <div className="spinner">
                    <Spinner />
                </div>
            </div>
        );
    }

    if (!profileData) {
        return (
            <div className={styles.container}>
                <h2>No User Data!</h2>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {!isLoading && profileData && (
                <>
                    <div className={styles.background_img}></div>
                    <div className={styles.wrapper}>
                        <img
                            src={profileData.photo_url || GenProfile}
                            className={styles.profile_photo}
                            alt={`${profileData.firstName} ${profileData.lastName}, employé chez groupomania.`}
                        />
                        <div className={styles.hero_block}>
                            <h2 className={styles.title}>
                                {profileData.firstName} {profileData.lastName}
                            </h2>
                            <a href={profileData.linkedin_url} rel="noopener">
                                <img
                                    className={styles.Linkedin_icon}
                                    src={LinkedinIcon}
                                    alt="Logo du reseaux social linkedin"
                                />
                            </a>
                        </div>
                        <p className={styles.department}>{profileData.department}</p>
                        <p className={styles.role}>{profileData.role}</p>
                        <a className={styles.email} href={`mailto:${profileData.email}`}>
                            {profileData.email}
                        </a>
                        <Counter likesCount={profileData.likesCount || 0} postsCount={profileData.postsCount || 0} />
                    </div>
                </>
            )}
        </div>
    );
};

export default UserProfile;
