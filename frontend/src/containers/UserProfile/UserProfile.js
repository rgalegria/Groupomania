import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useHttpRequest } from "../../hooks/httpRequest-hook";
import { AuthContext } from "../../context/auth-context";
import { useWindowDimensions } from "../../hooks/window-hook";

// Static Images
import GenProfile from "../../images/generic_profile_picture.jpg";

// Icons
import LinkedinIcon from "../../images/linkedin-icon.svg";
import LinkedinGreyIcon from "../../images/linkedin-grey-icon.svg";
import modify from "../../images/modify-icon.svg";
import back from "../../images/back-icon.svg";

// Components
import ErrorModal from "../../components/ErrorModal/ErrorModal";
import NavBtn from "../../components/Buttons/NavBtn/NavBtn";
import Counter from "../../components/Counter/Counter";
import Spinner from "../../components/LoadingSpinner/LoadingSpinner";

// Styles
import styles from "./UserProfile.module.css";

const UserProfile = () => {
    // Authentication context
    const auth = useContext(AuthContext);

    // Backend Request Hook
    const { isLoading, error, sendRequest, clearError } = useHttpRequest();

    //Profile Hook
    const [profileData, setProfileData] = useState();

    // Window Size
    const { width } = useWindowDimensions();

    // Id de l'utilisateur à afficher
    const userId = Number(useParams().id);

    // Fetch l'utilisateur à afficher
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await sendRequest(`${process.env.REACT_APP_API_URL}/profile/${userId}`, "GET", null, {
                    Authorization: "Bearer " + auth.token,
                });

                setProfileData(userData);
            } catch (err) {}
        };
        fetchUser();
    }, [sendRequest, auth.token, userId]);

    let btnStyle = styles.btnStyle;
    let iconStyle = `${styles.iconStyle} icon_red`;
    let desktopNav;

    // Affichage Nav Desktop
    if (width >= 1024) {
        desktopNav = (
            <nav className={styles.nav}>
                <NavBtn
                    id="back"
                    name="retourner"
                    icon={back}
                    link="/posts"
                    btnStyle={btnStyle}
                    iconColor={iconStyle}
                />
            </nav>
        );
    }

    // Validation Affichage Nav Desktop si l'utilisateur c'est le même qui s'affiche
    if (width >= 1024) {
        if (auth.userId === userId) {
            desktopNav = (
                <nav className={styles.nav}>
                    <NavBtn
                        id="back"
                        name="retourner"
                        icon={back}
                        link="/posts"
                        btnStyle={btnStyle}
                        iconColor={iconStyle}
                    />
                    <NavBtn
                        id="update-profile"
                        name="Modifier"
                        icon={modify}
                        link={`/profile/${auth.userId}/update`}
                        btnStyle={btnStyle}
                        iconColor={iconStyle}
                    />
                </nav>
            );
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
            <>
                <ErrorModal error={error} onClear={clearError} />
                <div className={styles.container}>
                    <h2>No User Data!</h2>
                </div>
            </>
        );
    }

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
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
                                {profileData.linkedin_url ? (
                                    <a href={profileData.linkedin_url} rel="noopener">
                                        <img
                                            className={styles.Linkedin_icon}
                                            src={LinkedinIcon}
                                            alt="Logo du reseaux social linkedin"
                                        />
                                    </a>
                                ) : (
                                    <img
                                        className={styles.Linkedin_icon}
                                        src={LinkedinGreyIcon}
                                        alt="Logo du reseaux social linkedin"
                                    />
                                )}
                            </div>
                            <p className={styles.department}>{profileData.department}</p>
                            <p className={styles.role}>{profileData.role}</p>
                            <a className={styles.email} href={`mailto:${profileData.email}`}>
                                {profileData.email}
                            </a>
                            <Counter
                                likesCount={profileData.likesCount || 0}
                                postsCount={profileData.postsCount || 0}
                            />
                            {desktopNav}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default UserProfile;
