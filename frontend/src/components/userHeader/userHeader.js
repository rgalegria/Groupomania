import React from "react";
import { Link } from "react-router-dom";

// Styles
import styles from "./UserHeader.module.css";
const userHeader = (props) => {
    let category;

    if (props.category) {
        category = (
            <>
                <span className={styles.text_division}>|</span>
                <span>{props.category}</span>
            </>
        );
    } else {
        category = "";
    }
    return (
        <header className={styles.block}>
            <Link to={`/profile/${props.user_id}`}>
                <img className={styles.photo} src={props.photo_url} alt={`${props.firstName} ${props.lastName}`} />
                {props.firstName} {props.lastName}
            </Link>
            <p className={styles.text}>
                {category}
                <span className={styles.text_division}>•</span>
                <span>{props.date}</span>
            </p>
        </header>
    );
};

export default userHeader;
