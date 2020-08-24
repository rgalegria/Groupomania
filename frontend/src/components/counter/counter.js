import React from "react";

// Static Images
import logotype from "../../images/logotype.svg";

// Styles
import styles from "./Counter.module.css";

const Counter = (props) => {
    return (
        <div className={styles.block}>
            <div className={styles.counter}>
                <h5 className={styles.title}>Posts publiés</h5>
                <span className={styles.count}>{props.postsCount}</span>
                <p className={styles.text}>pas vous</p>
            </div>

            <img className={styles.logotype} src={logotype} alt="Logo de Groupomania" />

            <div className={styles.counter}>
                <h5 className={styles.title}>Posts publiés</h5>
                <span className={styles.count}>{props.likesCount}</span>
                <p className={styles.text}>pas vos collègues</p>
            </div>
        </div>
    );
};

export default Counter;
