import React from "react";
import like from "../images/like-icon.svg";
import dislike from "../images/dislike-icon.svg";
import comments from "../images/comments-icon.svg";
import comment from "../images/comment-icon.svg";
import styles from "./post.module.css";

const post = (props) => {
    return (
        <div className={styles.block}>
            <h3 className={styles.title}>{props.title}</h3>
            <img className={styles.photo} src={props.image_url} alt="post" />
            <div className={styles.reactions}>
                <button className={styles.reaction_btn}>
                    <img className={styles.icon} src={like} alt="like icon" />
                    <span>{props.likes}</span>
                </button>
                <button className={styles.reaction_btn}>
                    <img className={styles.icon} src={dislike} alt="dislike icon" />
                    <span>{props.dislikes}</span>
                </button>
                <button className={styles.reaction_btn}>
                    <img className={styles.icon} src={comments} alt="comments icon" />
                    <span>1</span>
                </button>
                <button className={styles.comment_btn}>
                    <img className={styles.icon} src={comment} alt="comment icon" />
                    <span>commentez</span>
                </button>
            </div>
        </div>
    );
};

export default post;
