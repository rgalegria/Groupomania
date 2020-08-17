import React from "react";

// Icons
import back from "../../images/back-icon.svg";
import login from "../../images/login-icon.svg";

// Components
import ActionBtn from "../../components/Buttons/ActionBtn/ActionBtn";

const NavLogin = (props) => {
    return (
        <>
            <ActionBtn icon={back} name="retourner" onClick={props.onClick} />
            <ActionBtn id="login-btn" form="login-form" name="connexion" type="submit" icon={login} />
        </>
    );
};

export default NavLogin;
