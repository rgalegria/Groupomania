import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import { Link } from "react-router-dom";
import { useHttpRequest } from "../../hooks/httpRequest-hook";
import { useWindowDimensions } from "../../hooks/window-hook";

// Icons
import clockIcon from "../../images/clock-icon.svg";
import coffeeIcon from "../../images/coffee-icon.svg";
import postIcon from "../../images/post-icon.svg";

// Components
import ErrorModal from "../../components/ErrorModal/ErrorModal";
import TabBtn from "../../components/Buttons/TabBtn/TabBtn";
import PostList from "../../components/PostList/PostList";
import Spinner from "../../components/LoadingSpinner/LoadingSpinner";

// Styles
import styles from "./Posts.module.css";

const Posts = () => {
    // Authentication context
    const auth = useContext(AuthContext);

    // Window Size
    const { width } = useWindowDimensions();

    // Request Hook
    const { isLoading, error, sendRequest, clearError } = useHttpRequest();

    //Posts State
    const [posts, setPosts] = useState();

    // Tab Btn State
    const [activeBtn, setActiveBtn] = useState({
        mostRecents: "active",
        mostLiked: "",
    });

    // Fetch Initial
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsData = await sendRequest(`${process.env.REACT_APP_API_URL}/posts`, "GET", null, {
                    Authorization: "Bearer " + auth.token,
                });
                setPosts(postsData);
            } catch (err) {}
        };
        fetchPosts();
    }, [sendRequest, auth.token]);

    // Fetch Most recent posts
    const fetchMostRecent = async () => {
        setActiveBtn({
            mostRecents: "active",
            mostLiked: "",
        });
        try {
            const postsData = await sendRequest(`${process.env.REACT_APP_API_URL}/posts`, "GET", null, {
                Authorization: "Bearer " + auth.token,
            });
            setPosts(postsData);
        } catch (err) {}
    };

    // Fetch Most liked posts
    const fetchMostLiked = async () => {
        setActiveBtn({
            mostRecents: "",
            mostLiked: "active",
        });
        try {
            const postsData = await sendRequest(`${process.env.REACT_APP_API_URL}/posts/most-liked`, "GET", null, {
                Authorization: "Bearer " + auth.token,
            });
            setPosts(postsData);
        } catch (err) {}
    };

    // Delete POST Handler
    const deletePostHandler = (deletedPostId) => {
        setPosts((prevPosts) => prevPosts.filter((post) => post.post_id !== deletedPostId));
    };

    // Affichage menu post en desktop
    let newPost;

    if (width >= 1024) {
        newPost = (
            <Link to={`posts/new`} className={styles.btn}>
                <span className={styles.text}>NOUVEAU POST</span>
                <img className={styles.icon} src={postIcon} alt="" />
            </Link>
        );
    }

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            <nav className={styles.header}>
                <TabBtn name="À LA UNE" icon={clockIcon} active={activeBtn.mostRecents} onClick={fetchMostRecent} />
                <TabBtn name="LES PLUS AIMÉS" icon={coffeeIcon} active={activeBtn.mostLiked} onClick={fetchMostLiked} />
                {newPost}
            </nav>
            <div className="container">
                {isLoading && (
                    <div className="spinner">
                        <Spinner />
                    </div>
                )}
                {!isLoading && activeBtn && posts && <PostList items={posts} onDeletePost={deletePostHandler} />}
            </div>
        </>
    );
};

export default Posts;
