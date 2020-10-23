import React from "react";
import { Link } from "react-router-dom";

// Icons
import like from "../../../images/like-icon.svg";
import dislike from "../../../images/dislike-icon.svg";
import comment from "../../../images/comment-icon.svg";
import comments from "../../../images/comments-icon.svg";

// Styles
import styles from "./ReactionBtn.module.css";

/*
Attend ==>

<ReactionBtn 
    btnType="functional, link, decor" 
    link={props.link} 
    reaction={props.userReaction === "like" || "dislike" ? "like" || "dislike" : null} icon="" text={props.text} 
    onCLick={props.onClick} 
    styling="Herited styles"
/>

*/

const ReactionBtn = (props) => {
    // Couleur du bouton like/dislike en fonction de la reaction de l'utilisateur
    let reactionColor = "";

    switch (props.reaction) {
        case "like":
            reactionColor = "icon_green";
            break;
        case "dislike":
            reactionColor = "icon_red";
            break;
        case null:
            reactionColor = "";
            break;
        default:
            console.log("Something went wrong with reactionColor in ReactionBtn Component");
    }

    // Type d'icône à montrer
    let icon;
    switch (props.icon) {
        case "like":
            icon = like;
            break;
        case "dislike":
            icon = dislike;
            break;
        case "comment":
            icon = comment;
            break;
        case "comments":
            icon = comments;
            break;
        default:
            console.log("Something went wrong with icon in ReactionBtn Component");
    }

    // Type de bouton à montrer
    let btn;
    switch (props.btnType) {
        case "functional":
            btn = (
                <button
                    name={props.name}
                    className={`${styles.reaction_btn} ${props.styling}`}
                    onClick={props.onReaction}
                >
                    <img className={`${styles.icon} ${reactionColor}`} src={icon} alt="" />
                    <span>{props.text}</span>
                </button>
            );
            break;
        case "link":
            btn = (
                <Link to={props.link} className={`${styles.reaction_btn} ${props.styling}`}>
                    <img className={`${styles.icon} ${reactionColor}`} src={icon} alt="" />
                    <span>{props.text}</span>
                </Link>
            );
            break;
        case "decor":
            btn = (
                <div className={`${styles.reaction_btn} ${props.styling}`}>
                    <img className={`${styles.icon} ${reactionColor}`} src={icon} alt="" />
                    <span>{props.text}</span>
                </div>
            );
            break;
        default:
            console.log("Something went wrong with btn in ReactionBtn Component");
    }

    return <>{btn}</>;
};

export default ReactionBtn;
