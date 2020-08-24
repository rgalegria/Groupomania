import React from "react";

// Icons
import like from "../../images/like-icon.svg";
import dislike from "../../images/dislike-icon.svg";
import comments from "../../images/comments-icon.svg";
import comment from "../../images/comment-icon.svg";

// Styles
import styles from "./Post.module.css";
import UserHeader from "../UserHeader/UserHeader";

const post = (props) => {
    return (
        <>
            <article>
                <UserHeader
                    user_id={props.user_id}
                    photo_url={props.photo_url}
                    firstName={props.firstName}
                    lastName={props.lastName}
                    post_date={props.post_date}
                    category={props.category}
                />
                <section className={styles.block}>
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
                </section>
            </article>
        </>
    );
};

export default post;
