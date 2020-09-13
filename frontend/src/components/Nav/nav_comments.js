import React from "react";

// Icons
import back from "../../images/back-icon.svg";

// Components
import ActionBtn from "../../components/Buttons/ActionBtn/ActionBtn";

const NavComments = (props) => {
    return (
        <>
            <ActionBtn icon={back} name="retourner" onClick={props.backHandle} iconColor="icon_white" />
        </>
    );
};

export default NavComments;
