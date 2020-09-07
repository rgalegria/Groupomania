import React from "react";

// Icons
import back from "../../images/back-icon.svg";
import send_w from "../../images/send_w-icon.svg";

// Components
import ActionBtn from "../Buttons/ActionBtn/ActionBtn";

const NavNewPost = (props) => {
    return (
        <>
            <ActionBtn icon={back} name="retourner" onClick={props.backHandle} />
            <ActionBtn id="send-post-btn" form="send-post-form" name="publier" type="submit" icon={send_w} />
        </>
    );
};

export default NavNewPost;
