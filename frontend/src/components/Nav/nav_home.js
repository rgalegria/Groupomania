import React from "react";

// Icons
import signup from "../../images/signup-icon.svg";
import login from "../../images/login-icon.svg";

// Components
import NavBtn from "../../components/Buttons/NavBtn/NavBtn";

const NavHome = () => {
    return (
        <>
            <NavBtn icon={login} name="connexion" link="/login" iconColor="icon_white" />
            <NavBtn icon={signup} name="s'inscrire" link="/signup" iconColor="icon_white" />
        </>
    );
};

export default NavHome;
