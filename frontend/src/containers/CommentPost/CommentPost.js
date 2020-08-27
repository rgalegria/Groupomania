import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useHttpRequest } from "../../hooks/httpRequest-hook";
import { AuthContext } from "../../context/auth-context";

// Static Images

// Icons

// Components
import Post from "../../components/Post/Post";
import Comment from "../../components/Comment/Comment";
import Spinner from "../../components/LoadingSpinner/LoadingSpinner";

// Styles
import styles from "./CommentPost.module.css";

const UserProfile = () => {
    console.log("POST Comment");

    // Authentication context
    const auth = useContext(AuthContext);

    // Backend Request Hook
    const { isLoading, error, sendRequest, clearError } = useHttpRequest();

    //Posts Hook
    const [postData, setPostData] = useState();
    console.log("PostData:", postData);

    //Comments Hook
    const [postComments, setPostComments] = useState();
    console.log("postComments:", postComments);

    const postId = useParams().id;

    useEffect(() => {
        console.log("useEFFECT");
        const fetchUser = async () => {
            try {
                console.log("FETCHING");
                const userData = await sendRequest(`http://localhost:4200/posts/${postId}`, "GET", null, {
                    Authorization: "Bearer " + auth.token,
                });
                // console.log("BACKEND Data:", userData);
                // console.log("BACKEND Comments:", userData.comments);
                setPostData(userData);
                setPostComments(userData.comments);
            } catch (err) {}
        };
        fetchUser();
    }, []);

    if (isLoading) {
        return (
            <div className={styles.container}>
                <div className="spinner">
                    <Spinner />
                </div>
            </div>
        );
    }

    if (!postData) {
        return (
            <div className={styles.container}>
                <h2>No User Data!</h2>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {!isLoading && postData && postComments && (
                <div className={styles.wrapper}>
                    <Post
                        user_id={postData.user_id}
                        photo_url={postData.photo_url}
                        firstName={postData.firstName}
                        lastName={postData.lastName}
                        date={postData.post_date}
                        category={postData.category}
                        title={postData.title}
                        image_url={postData.image_url}
                        likes={postData.likes}
                        dislikes={postData.dislikes}
                        comments={postData.comments}
                    />
                    {postComments.map((comment, index) => {
                        return (
                            <Comment
                                key={index}
                                user_id={comment.id}
                                photo_url={comment.photo_url}
                                firstName={comment.firstName}
                                lastName={comment.lastName}
                                date={comment.comment_date}
                                message={comment.message}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default UserProfile;
