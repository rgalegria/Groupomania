import React, { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import { useHttpRequest } from "../../hooks/httpRequest-hook";

// Components
import UserHeader from "../UserHeader/UserHeader";

// Styles
import styles from "./Comment.module.css";

const Comment = (props) => {
    // Authentication context
    const auth = useContext(AuthContext);

    // Request Hook
    const { sendRequest } = useHttpRequest();

    //Delete Comment
    const DeleteCommentHandler = async () => {
        try {
            await sendRequest(`${process.env.REACT_APP_API_URL}/posts/comment/${props.id}`, "DELETE", null, {
                Authorization: "Bearer " + auth.token,
            });
            props.onDeleteComment(props.id);
        } catch (err) {}
    };

    return (
        <div>
            <UserHeader
                user_id={props.user_id}
                photo_url={props.photo_url}
                firstName={props.firstName}
                lastName={props.lastName}
                date={props.date}
                onDelete={DeleteCommentHandler}
            />
            <div className={styles.block}>
                <p className={styles.text}>{props.message}</p>
            </div>
        </div>
    );
};

export default Comment;
