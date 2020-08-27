import React from "react";

// Components
import UserHeader from "../UserHeader/UserHeader";

// Styles
import styles from "./Comment.module.css";

const Comment = (props) => {
    return (
        <>
            <UserHeader
                user_id={props.user_id}
                photo_url={props.photo_url}
                firstName={props.firstName}
                lastName={props.lastName}
                date={props.date}
            />
            <div className={styles.block}>
                <p className={styles.text}>{props.message}</p>
            </div>
        </>
    );
};

export default Comment;
