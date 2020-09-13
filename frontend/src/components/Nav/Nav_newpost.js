import React from "react";

// Icons
import back from "../../images/back-icon.svg";
import send from "../../images/send-icon.svg";

// Components
import ActionBtn from "../Buttons/ActionBtn/ActionBtn";

const NavNewPost = (props) => {
    return (
        <>
            <ActionBtn icon={back} name="retourner" onClick={props.backHandle} iconColor="icon_white" />
            <ActionBtn
                id="send-post-btn"
                form="send-post-form"
                name="publier"
                type="submit"
                icon={send}
                iconColor="icon_white"
            />
        </>
    );
};

export default NavNewPost;
