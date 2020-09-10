import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useHttpRequest } from "../../hooks/httpRequest-hook";
import { AuthContext } from "../../context/auth-context";
import { useWindowDimensions } from "../../hooks/window-hook";

// Static Images
import GenProfile from "../../images/generic_profile_picture.jpg";

// Icons
import LinkedinIcon from "../../images/linkedin-icon.svg";
import modify from "../../images/modify-icon.svg";

// Components
import NavBtn from "../../components/Buttons/NavBtn/NavBtn";
import Counter from "../../components/Counter/Counter";
import Spinner from "../../components/LoadingSpinner/LoadingSpinner";

// Styles
import styles from "./UserProfile.module.css";

const UserProfile = () => {
    // Authentication context
    const auth = useContext(AuthContext);

    // Backend Request Hook
    const { isLoading, /*error,*/ sendRequest /*clearError*/ } = useHttpRequest();

    //Profile Hook
    const [profileData, setProfileData] = useState();

    // Window Size
    const { width } = useWindowDimensions();

    const userId = Number(useParams().id);

    useEffect(() => {
        // console.log("useEFFECT");
        const fetchUser = async () => {
            try {
                // console.log("FETCHING");
                const userData = await sendRequest(`${process.env.REACT_APP_API_URL}/profile/${userId}`, "GET", null, {
                    Authorization: "Bearer " + auth.token,
                });
                // console.log("BACKEND Data:", userData);
                setProfileData(userData);
                // console.log("REACT Data:", profileData);
            } catch (err) {}
        };
        fetchUser();
    }, [sendRequest, auth.token, userId]);

    // Modify Btn

    let btnStyle = styles.btnStyle;
    let iconStyle = `${styles.iconStyle} icon_red`;

    let modifyBtn;

    if (width >= 1024) {
        if (auth.userId === userId) {
            modifyBtn = (
                <NavBtn
                    id="update-profile"
                    name="Modifier profil"
                    icon={modify}
                    link={`/profile/${auth.userId}/update`}
                    btnStyle={btnStyle}
                    iconStyle={iconStyle}
                />
            );
        } else {
            modifyBtn = "";
        }
    }

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
        <div className={`container ${styles.class_mod}`}>
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
                        {modifyBtn}
                    </div>
                </>
            )}
        </div>
    );
};

export default UserProfile;
