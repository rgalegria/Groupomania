import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { useHttpRequest } from "../../hooks/httpRequest-hook";
import { AuthContext } from "../../context/auth-context";

// Static Images
import GenProfile from "../../images/generic_profile_picture.jpg";

// Icons
import person from "../../images/person-icon.svg";
import agenda from "../../images/agenda-icon.svg";
import logout from "../../images/logout-icon.svg";

// Components
import Spinner from "../../components/LoadingSpinner/LoadingSpinner";

// Styles
import styles from "./Menu.module.css";

const Menu = () => {
    // Authentication context
    const auth = useContext(AuthContext);

    // Backend Request Hook
    const { isLoading, /*error,*/ sendRequest /*clearError*/ } = useHttpRequest();

    // History context
    const history = useHistory();

    //Profile Hook
    const [profileData, setProfileData] = useState();

    //Fetch Most recent posts
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const userData = await sendRequest(`http://localhost:4200/profile/${auth.userId}`, "GET", null, {
                    Authorization: "Bearer " + auth.token,
                });
                console.log("user Data=>", userData);
                setProfileData(userData);
            } catch (err) {}
        };
        fetchPosts();
    }, [sendRequest, auth.token]);

    const logoutHandler = (event) => {
        event.preventDefault();
        auth.logout();
        history.push(`/`);
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

    if (!profileData) {
        return (
            <div className={styles.container}>
                <h2>No User Data!</h2>
            </div>
        );
    }

    return (
        <div className={styles.cover}>
            {!isLoading && profileData && (
                <>
                    <div className={styles.background_img}></div>
                    <div className={styles.wrapper}>
                        <img
                            src={profileData.photo_url || GenProfile}
                            className={styles.profile_photo}
                            alt={`${profileData.firstName} ${profileData.lastName}`}
                        />
                        <div className={styles.hero_block}>
                            <h2 className={styles.title}>Bienvenue {profileData.firstName} !</h2>
                        </div>
                    </div>
                    <div className={styles.list}>
                        <Link to={`profile/${auth.userId}`} className={`${styles.btn} ${styles.border}`}>
                            <span className={styles.text}>Mon profil</span>
                            <img className={styles.icon} src={person} alt="A REVISAR" />
                        </Link>
                        <Link to={`/menu`} className={`${styles.btn} ${styles.border}`}>
                            <span className={styles.text}>Annuaire</span>
                            <img className={styles.icon} src={agenda} alt="A REVISAR" />
                        </Link>
                        <button className={`${styles.btn} ${styles.logout_margin}`} onClick={logoutHandler}>
                            <span className={styles.text}>Se deconnecter</span>
                            <img className={styles.icon} src={logout} alt="A REVISAR" />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Menu;
