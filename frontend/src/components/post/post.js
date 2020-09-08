import React, { useContext, useState } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import { useHttpRequest } from "../../hooks/httpRequest-hook";
import { AuthContext } from "../../context/auth-context";

// Icons
import like from "../../images/like-icon.svg";
import dislike from "../../images/dislike-icon.svg";
import comments from "../../images/comments-icon.svg";
import comment from "../../images/comment-icon.svg";

// Components
import UserHeader from "../UserHeader/UserHeader";
import Spinner from "../../components/LoadingSpinner/LoadingSpinner";

// Styles
import styles from "./Post.module.css";

// manejar el useState de manera local para los likes

const Post = (props) => {
    // Authentication context
    const auth = useContext(AuthContext);

    // Request Hook
    const { isLoading, /*error,*/ sendRequest /*clearError*/ } = useHttpRequest();

    // History context
    const history = useHistory();

    // App Location
    const path = props.location.pathname;
    const postId = props.location.pathname.split("/")[2];

    const [likes, setLikes] = useState();

    const [userReaction, setUserReaction] = useState();

    // Delete Post
    const DeleteHandler = async () => {
        try {
            await sendRequest(
                `${process.env.REACT_APP_API_URL}/posts/${props.id}`,
                "DELETE",
                JSON.stringify({ image_url: props.image_url }),
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + auth.token,
                }
            );
            if (path === `/posts/${postId}`) {
                history.push(`/posts`);
            } else {
                props.onDelete(props.id);
            }
        } catch (err) {}
    };

    //Like Handler
    const likePostHandler = async (event) => {
        event.preventDefault();
        // hacer verificacion si dio like antes
        // hacer verificacion si dio like antes
        // setLikes( count + 1, );
    };

    //Dislike Handler
    const dislikePostHandler = async (event) => {
        event.preventDefault();
        console.log("dislike click!");
    };

    // Color the like Btn if User has liked post
    let likeIcon;

    if (props.userReaction === "like") {
        likeIcon = <img className={`${styles.icon} icon_green`} src={like} alt="like icon" />;
    } else if (props.userReaction === null) {
        likeIcon = <img className={styles.icon} src={like} alt="like icon" />;
    }

    // Color the dislike Btn if User has disliked post
    let dislikeIcon;

    if (props.userReaction === "dislike") {
        dislikeIcon = <img className={`${styles.icon} icon_red`} src={dislike} alt="dislike icon" />;
    } else if (props.userReaction === null) {
        dislikeIcon = <img className={styles.icon} src={dislike} alt="dislike icon" />;
    }

    // Hide and Rearrange comments and comment Btns in posts and comment views
    let commentBlock;

    if (props.location.pathname === "/posts") {
        commentBlock = (
            <>
                <div className={styles.reaction_btn}>
                    <img className={styles.icon} src={comments} alt="comments icon" />
                    <span>{props.comments}</span>
                </div>
                <Link to={props.post_link} className={styles.comment_btn}>
                    <img className={styles.icon} src={comment} alt="comment icon" />
                    <span>commentez</span>
                </Link>
            </>
        );
    } else {
        commentBlock = (
            <button className={`${styles.reaction_btn} ${styles.push_right}`}>
                <img className={styles.icon} src={comments} alt="comments icon" />
                <span>{props.comments}</span>
            </button>
        );
    }

    return (
        <article id={props.post_id}>
            {isLoading && (
                <div className="spinner">
                    <Spinner asOverlay />
                </div>
            )}
            <UserHeader
                user_id={props.user_id}
                photo_url={props.photo_url}
                firstName={props.firstName}
                lastName={props.lastName}
                date={props.date}
                category={props.category}
                onDelete={DeleteHandler}
            />
            <section className={styles.block}>
                <h3 className={styles.title}>{props.title}</h3>
                <img className={styles.photo} src={props.image_url} alt="post" />
                <footer className={styles.reactions}>
                    <button className={styles.reaction_btn} onClick={props.onLike}>
                        {likeIcon}
                        <span>{props.likes}</span>
                    </button>
                    <button className={styles.reaction_btn} onClick={props.onDislike}>
                        {dislikeIcon}
                        <span>{props.dislikes}</span>
                    </button>
                    {commentBlock}
                </footer>
            </section>
        </article>
    );
};

export default withRouter(Post);
