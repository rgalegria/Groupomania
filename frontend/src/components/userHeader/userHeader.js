import React from "react";
import styles from "./userHeader.module.css";

const userHeader = (props) => {
    return (
        <div className={styles.block}>
            <img className={styles.photo} src={props.photo_url} href="#" alt={props.firstName} />
            <p className={styles.text}>
                {props.firstName} {props.lastName}
                <span className={styles.text_division}>|</span>
                <span>
                    {props.category}
                    <span className={styles._text_dot}>•</span>
                    {props.post_date}
                </span>
            </p>
        </div>
    );
};

export default userHeader;
