import React from "react";
import styles from "./UserHeader.module.css";
import { Link } from "react-router-dom";

const userHeader = (props) => {
    return (
        <header className={styles.block}>
            <Link to={`/profile/${props.user_id}`}>
                <img className={styles.photo} src={props.photo_url} alt={`${props.firstName} ${props.lastName}`} />
                {props.firstName} {props.lastName}
            </Link>
            <p className={styles.text}>
                <span className={styles.text_division}>|</span>
                <span>{props.category}</span>
                <span className={styles.text_division}>•</span>
                <span>{props.post_date}</span>
            </p>
        </header>
    );
};

export default userHeader;
