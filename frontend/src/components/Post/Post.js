import React, { useContext, useState } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { useHttpRequest } from "../../hooks/httpRequest-hook";
import { AuthContext } from "../../context/auth-context";

// Components
import ReactionBtn from "../../components/Buttons/ReactionBtn/ReactionBtn";
import UserHeader from "../UserHeader/UserHeader";
import Spinner from "../../components/LoadingSpinner/LoadingSpinner";

// Styles
import styles from "./Post.module.css";

// manejar el useState de manera local para los likes

const Post = (props) => {
    // Authentication context
    const auth = useContext(AuthContext);

    // Request Hook
    const { isLoading, sendRequest } = useHttpRequest();

    // History context
    const history = useHistory();

    // App Location
    const path = props.location.pathname;
    const postId = props.location.pathname.split("/")[2];

    // User Likes
    const [likesCounter, setLikesCounter] = useState(props.likes);

    // User Dislikes
    const [dislikesCounter, setDislikesCounter] = useState(props.dislikes);

    // User's reaction to post
    const [userReaction, setUserReaction] = useState(props.userReaction);

    // Reaction status
    const [hasReacted, setHasReacted] = useState(props.userReaction === null ? false : true);

    // Reaction Handler
    const userReactionHandler = (event) => {
        event.preventDefault();
        let reaction;

        switch (userReaction) {
            case null:
                if (event.currentTarget.name === "like") {
                    setLikesCounter(likesCounter + 1);
                    reaction = event.currentTarget.name;
                } else {
                    setDislikesCounter(dislikesCounter + 1);
                    reaction = event.currentTarget.name;
                }
                setUserReaction(event.currentTarget.name);
                setHasReacted(true);

                break;

            case "null":
                if (event.currentTarget.name === "like") {
                    setLikesCounter(likesCounter + 1);
                    reaction = event.currentTarget.name;
                } else {
                    setDislikesCounter(dislikesCounter + 1);
                    reaction = event.currentTarget.name;
                }
                setUserReaction(event.currentTarget.name);

                break;

            case "like":
                if (event.currentTarget.name === "like") {
                    setLikesCounter(likesCounter - 1);
                    setUserReaction("null");
                    reaction = "null";
                } else {
                    setLikesCounter(likesCounter - 1);
                    setDislikesCounter(dislikesCounter + 1);
                    setUserReaction(event.currentTarget.name);
                    reaction = event.currentTarget.name;
                }

                break;

            case "dislike":
                if (event.currentTarget.name === "dislike") {
                    setDislikesCounter(dislikesCounter - 1);
                    setUserReaction("null");
                    reaction = "null";
                } else {
                    setLikesCounter(likesCounter + 1);
                    setDislikesCounter(dislikesCounter - 1);
                    setUserReaction(event.currentTarget.name);
                    reaction = event.currentTarget.name;
                }

                break;

            default:
                console.log("an error was produced in userReactionHandler function on post component");
                break;
        }

        fetch(`${process.env.REACT_APP_API_URL}/posts/reaction`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: "Bearer " + auth.token },
            body: JSON.stringify({
                post_id: props.id,
                reaction: reaction,
                reacted: hasReacted,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    return;
                }
            })
            .catch((err) => console.log(err));
    };

    // Delete Post
    const DeletePostHandler = async () => {
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

    // Type de visualisation sur Posts et Comment Post
    let commentBlock;

    if (props.location.pathname === "/posts") {
        commentBlock = (
            <>
                <ReactionBtn btnType="decor" icon="comments" text={props.comments} styling="" reaction={null} />
                <ReactionBtn
                    btnType="link"
                    link={props.post_link}
                    reaction={null}
                    icon="comment"
                    text="commenter"
                    styling={styles.comment_btn}
                />
            </>
        );
    } else {
        commentBlock = (
            <ReactionBtn
                btnType="decor"
                icon="comments"
                text={props.comments}
                styling={styles.push_right}
                reaction={null}
            />
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
                onDelete={DeletePostHandler}
            />
            <section className={styles.block}>
                <h3 className={styles.title}>{props.title}</h3>
                <img className={styles.photo} src={props.image_url} alt="post" />
                <footer className={styles.reactions}>
                    <ReactionBtn
                        btnType="functional"
                        name="like"
                        onReaction={userReactionHandler}
                        reaction={userReaction === "like" ? "like" : null}
                        icon="like"
                        text={likesCounter}
                        styling=""
                    />
                    <ReactionBtn
                        btnType="functional"
                        name="dislike"
                        onReaction={userReactionHandler}
                        reaction={userReaction === "dislike" ? "dislike" : null}
                        icon="dislike"
                        text={dislikesCounter}
                        styling=""
                    />
                    {commentBlock}
                </footer>
            </section>
        </article>
    );
};

export default withRouter(Post);
