import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth-context";

// Static Images
import girl from "../../images/fille.jpg";

// Components
import Post from "../../components/Post/Post";
import TabBtn from "../../components/Buttons/TabBtn/TabBtn";

// Icons
import clockIcon from "../../images/clock-icon.svg";
import coffeeIcon from "../../images/coffee-icon.svg";

// Styles
import styles from "./Posts.module.css";

const Posts = () => {
    // Authentication context
    const auth = useContext(AuthContext);

    //Posts Hook
    const [posts, setPosts] = useState([]);

    //Fetch Data
    useEffect(() => {
        fetch("http://localhost:4200/posts", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + auth.token,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setPosts(data);
            });
    }, []);

    console.log("Auth de post:", auth);

    return (
        <>
            <header className={styles.header}>
                <TabBtn link="/posts" name="À LA UNE" icon={clockIcon} active="active" />
                <TabBtn link="/mosted-liked" icon={coffeeIcon} name="LES PLUS AIMÉS" />
            </header>
            <div className={styles.container}>
                <section>
                    {posts.map((post, index) => {
                        return (
                            <Post
                                key={index}
                                photo_url={girl}
                                firstName={post.firstName}
                                lastName={post.lastName}
                                post_date={post.post_date}
                                category={post.category}
                                title={post.title}
                                image_url={post.image_url}
                                likes={post.likes}
                                dislikes={post.dislikes}
                                comments={post.comments}
                            />
                        );
                    })}
                </section>
            </div>
        </>
    );
};

export default Posts;
