import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useHttpRequest } from "../../hooks/httpRequest-hook";
import { useForm } from "../../hooks/form-hook";
import { AuthContext } from "../../context/auth-context";
import { useHistory } from "react-router-dom";
import { MinLength, MaxLength } from "../../utils/validators";

// Components
import Post from "../../components/Post/Post";
import Comment from "../../components/Comment/Comment";
import WriteComment from "../../components/WriteComment/WriteComment";
import Spinner from "../../components/LoadingSpinner/LoadingSpinner";

// Styles
import styles from "./CommentPost.module.css";

const CommentPost = () => {
    // Authentication context
    const auth = useContext(AuthContext);

    // Post ID
    const postId = useParams().id;

    // Authentication context
    const history = useHistory();

    // Backend Request Hook
    const { isLoading, /*error,*/ sendRequest /*clearError*/ } = useHttpRequest();

    //Posts Hook
    const [post, setPost] = useState();

    //Comments Hook
    const [comments, setComments] = useState();

    // Input Hook
    const [formState, inputHandler] = useForm(
        {
            comment: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    const postCommentHandler = async (event) => {
        event.preventDefault();
        const data = {
            postId: postId,
            message: formState.inputs.comment.value,
        };

        try {
            await sendRequest(`http://localhost:4200/posts/comment`, "POST", JSON.stringify(data), {
                "Content-Type": "application/json",
                Authorization: "Bearer " + auth.token,
            });
            // history.push(`/posts/${postId}`);
        } catch (err) {}
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const post = await sendRequest(`http://localhost:4200/posts/${postId}`, "GET", null, {
                    Authorization: "Bearer " + auth.token,
                });
                setPost(post[0]);
                setComments(post[1].comments);
            } catch (err) {}
        };
        fetchUser();
    }, [setComments]);

    // Delete POST Handler
    const deletePostHandler = (deletedPostId) => {
        setPost((prevPosts) => prevPosts.filter((post) => post.post_id !== deletedPostId));
    };

    // Delete COMMENT Handler
    const deleteCommentHandler = (deletedCommentId) => {
        setComments((prevComments) => prevComments.filter((comment) => comment.id !== deletedCommentId));
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

    if (isLoading) {
        return (
            <div className={styles.container}>
                <div className="spinner">
                    <Spinner />
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className={styles.container}>
                <h2>No User Data!</h2>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {!isLoading && post && comments && (
                <div className={styles.wrapper}>
                    <Post
                        key={post.post_id}
                        id={post.post_id}
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
                        comments={post.commentsCounter}
                        userReaction={post.userReaction}
                        post_link={`/posts/${post.post_id}`}
                        onLike={likePostHandler}
                        onDislike={dislikePostHandler}
                        onDelete={deletePostHandler}
                    />
                    <section>
                        {comments.map((comment) => {
                            return (
                                <Comment
                                    key={comment.id}
                                    id={comment.id}
                                    user_id={comment.user_id}
                                    photo_url={comment.photo_url}
                                    firstName={comment.firstName}
                                    lastName={comment.lastName}
                                    date={comment.comment_date}
                                    message={comment.message}
                                    onDeleteComment={deleteCommentHandler}
                                />
                            );
                        })}
                    </section>
                    <form id="comment-form" onSubmit={postCommentHandler}>
                        <WriteComment
                            id="comment"
                            name="comment"
                            type="text"
                            placeholder="Écrivez un commentaire"
                            validators={[MinLength(2), MaxLength(255)]}
                            errorText="Veillez remplir le champ"
                            onInput={inputHandler}
                            initialValue={formState.inputs.comment.value}
                            initialValid={formState.inputs.comment.isValid}
                        />
                    </form>
                </div>
            )}
        </div>
    );
};

export default CommentPost;
