import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import { useHttpRequest } from "../../hooks/httpRequest-hook";

// Icons
import clockIcon from "../../images/clock-icon.svg";
import coffeeIcon from "../../images/coffee-icon.svg";

// Components
import TabBtn from "../../components/Buttons/TabBtn/TabBtn";
import PostList from "../../components/PostList/PostList";
import Spinner from "../../components/LoadingSpinner/LoadingSpinner";

// Styles
import styles from "./Posts.module.css";

const Posts = () => {
    //Posts Hook
    const [posts, setPosts] = useState();

    // Tab Btn state
    const [activeBtn, setActiveBtn] = useState({
        mostRecents: "active",
        mostLiked: "",
    });

    // Request Hook
    const { isLoading, /*error,*/ sendRequest /*clearError*/ } = useHttpRequest();

    // Authentication context
    const auth = useContext(AuthContext);

    //Fetch Most recent posts
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

    //Like Handler
    const likePostHandler = async (event) => {
        event.preventDefault();
        console.log("like click!");
    };

    //Dislike Handler
    const dislikePostHandler = async (event) => {
        event.preventDefault();
        console.log("dislike click!");
    };

    return (
        <>
            <nav className={styles.header}>
                <TabBtn name="À LA UNE" icon={clockIcon} active={activeBtn.mostRecents} onClick={fetchMostRecent} />
                <TabBtn name="LES PLUS AIMÉS" icon={coffeeIcon} active={activeBtn.mostLiked} onClick={fetchMostLiked} />
            </nav>
            <div className="container">
                {isLoading && (
                    <div className="spinner">
                        <Spinner />
                    </div>
                )}
                {!isLoading && posts && activeBtn && (
                    <PostList
                        items={posts}
                        onDeletePost={deletePostHandler}
                        onLikePost={likePostHandler}
                        onDislikePost={dislikePostHandler}
                    />
                )}
            </div>
        </>
    );
};

export default Posts;
