import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { useWindowDimensions } from "../../hooks/window-hook";
import { useHttpRequest } from "../../hooks/httpRequest-hook";
import { AuthContext } from "../../context/auth-context";

// Static Images
import GenProfile from "../../images/generic_profile_picture.jpg";

// Icons
import person from "../../images/person-icon.svg";
import agenda from "../../images/agenda-icon.svg";
import categories from "../../images/categories-icon.svg";
import logout from "../../images/logout-icon.svg";
import posts from "../../images/posts-icon.svg";

// Components
import ErrorModal from "../../components/ErrorModal/ErrorModal";
import Spinner from "../../components/LoadingSpinner/LoadingSpinner";

// Styles
import styles from "./Menu.module.css";

const Menu = () => {
    // Authentication context
    const auth = useContext(AuthContext);

    // Backend Request Hook
    const { isLoading, error, sendRequest, clearError } = useHttpRequest();

    // Window Size
    const { width } = useWindowDimensions();

    // History context
    const history = useHistory();

    //Profile Hook
    const [profileData, setProfileData] = useState();

    //Fetch Most recent posts
    useEffect(() => {
        let mounted = true;

        if (auth.token && auth.userId) {
            const fetchPosts = async () => {
                try {
                    const userData = await sendRequest(
                        `${process.env.REACT_APP_API_URL}/profile/${auth.userId}`,
                        "GET",
                        null,
                        {
                            Authorization: "Bearer " + auth.token,
                        }
                    );
                    if (mounted) {
                        setProfileData(userData);
                    }
                } catch (err) {}
            };
            fetchPosts();
        }

        return () => (mounted = false);
    }, [sendRequest, auth.token, auth.userId, setProfileData]);

    const logoutHandler = (event) => {
        event.preventDefault();
        auth.logout();
        history.push(`/`);
    };

    // Affichage Navlinks en desktop
    let navLinks;
    if (width >= 1024) {
        navLinks = (
            <>
                <Link to="/posts" className={`${styles.btn} ${styles.border}`}>
                    <span className={styles.text}>Publications</span>
                    <img className={`${styles.icon} icon_white`} src={posts} alt="" />
                </Link>
                <Link to="/posts" className={`${styles.btn} ${styles.border}`}>
                    <span className={styles.text}>Catégories</span>
                    <img className={`${styles.icon} icon_white`} src={categories} alt="" />
                </Link>
            </>
        );
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
            <>
                {!isLoading && profileData && (
                    <div className={styles.cover}>
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
                        <nav className={styles.list}>
                            <Link to={`profile/${auth.userId}`} className={`${styles.btn} ${styles.border}`}>
                                <span className={styles.text}>Mon profil</span>
                                <img className={`${styles.icon} icon_white`} src={person} alt="" />
                            </Link>
                            {navLinks}
                            <Link to="/posts" className={`${styles.btn} ${styles.border}`}>
                                <span className={styles.text}>Annuaire</span>
                                <img className={`${styles.icon} icon_white`} src={agenda} alt="" />
                            </Link>
                            <button className={`${styles.btn} ${styles.logout_margin}`} onClick={logoutHandler}>
                                <span className={styles.text}>Se déconnecter</span>
                                <img className={`${styles.icon} icon_white`} src={logout} alt="" />
                            </button>
                        </nav>
                    </div>
                )}
            </>
        </>
    );
};

export default Menu;
