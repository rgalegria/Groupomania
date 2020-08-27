import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import { useHttpRequest } from "../../hooks/httpRequest-hook";

// Components
import Post from "../../components/Post/Post";
import TabBtn from "../../components/Buttons/TabBtn/TabBtn";
import Spinner from "../../components/LoadingSpinner/LoadingSpinner";

// Icons
import clockIcon from "../../images/clock-icon.svg";
import coffeeIcon from "../../images/coffee-icon.svg";

// Styles
import styles from "./Posts.module.css";

const Posts = () => {
    console.log("POSTS");
    // Authentication context
    const auth = useContext(AuthContext);

    // console.log("Auth POST:", auth);

    // Backend Request Hook
    const { isLoading, error, sendRequest, clearError } = useHttpRequest();

    //Posts Hook
    const [posts, setPosts] = useState([]);

    //Fetch Data
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsData = await sendRequest("http://localhost:4200/posts", "GET", null, {
                    Authorization: "Bearer " + auth.token,
                });
                setPosts(postsData);
            } catch (err) {}
        };
        fetchPosts();
    }, []);

    let postsBlock = (
        <>
            {posts.map((post, index) => {
                return (
                    <Post
                        key={index}
                        user_id={post.user_id}
                        photo_url={post.photo_url}
                        firstName={post.firstName}
                        lastName={post.lastName}
                        date={post.post_date}
                        category={post.category}
                        title={post.title}
                        image_url={post.image_url}
                        likes={post.likes}
                        dislikes={post.dislikes}
                        comments={post.comments}
                    />
                );
            })}
        </>
    );

    return (
        <>
            <nav className={styles.header}>
                <TabBtn link="/posts" name="À LA UNE" icon={clockIcon} active="active" />
                <TabBtn link="/mosted-liked" icon={coffeeIcon} name="LES PLUS AIMÉS" />
            </nav>
            <div className={styles.container}>
                {isLoading && (
                    <div className="spinner">
                        <Spinner />
                    </div>
                )}
                {!isLoading && posts && postsBlock}
            </div>
        </>
    );
};

export default Posts;
