import React from "react";
import styles from "./comment.module.css";

const comment = (props) => {
    return (
        <div className={styles.block}>
            <p className={styles.text}>Trop marrant !</p>
        </div>
    );
};

export default comment;
