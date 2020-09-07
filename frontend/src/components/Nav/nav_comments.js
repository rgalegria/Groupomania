import React from "react";

// Icons
import back from "../../images/back-icon.svg";
import comment from "../../images/comment-icon.svg";

// Components
import ActionBtn from "../../components/Buttons/ActionBtn/ActionBtn";

const NavComments = (props) => {
    return (
        <>
            <ActionBtn icon={back} name="retourner" onClick={props.backHandle} />
        </>
    );
};

export default NavComments;
