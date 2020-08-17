import React from "./node_modules/react";

import styles from "./Comment.module.css";

const Comment = (props) => {
    return (
        <div className={styles.block}>
            <p className={styles.text}>Trop marrant !</p>
        </div>
    );
};

export default Comment;
