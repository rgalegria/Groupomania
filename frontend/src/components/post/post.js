import React, { useContext } from "react";
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
    // const [likes, setLikes] = useState();

    // User's reaction to post
    // const [userReaction, setUserReaction] = useState();

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

    //Like Handler
    const likePostHandler = async (event) => {
        event.preventDefault();
        console.log("like click!");
        // hacer verificacion si dio like antes
        // hacer verificacion si dio dislike antes
        // setLikes( count + 1, );
    };

    // Dislike Handler
    const dislikePostHandler = async (event) => {
        event.preventDefault();
        console.log("dislike click!");
    };

    // Type de visualisation en Posts et Comment Post
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
                        onClick={likePostHandler}
                        reaction={props.userReaction === "like" ? "like" : null}
                        icon="like"
                        text={props.likes}
                        styling=""
                    />
                    <ReactionBtn
                        btnType="functional"
                        onClick={dislikePostHandler}
                        reaction={props.userReaction === "dislike" ? "dislike" : null}
                        icon="dislike"
                        text={props.dislikes}
                        styling=""
                    />
                    {commentBlock}
                </footer>
            </section>
        </article>
    );
};

export default withRouter(Post);
