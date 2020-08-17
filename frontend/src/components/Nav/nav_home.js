import React from "react";

// Icons
import signup from "../../images/signup-icon.svg";
import login from "../../images/login-icon.svg";

// Components
import NavBtn from "../../components/Buttons/NavBtn/NavBtn";

const NavHome = (props) => {
    return (
        <>
            <NavBtn icon={login} name="connexion" link="/login" />
            <NavBtn icon={signup} name="s'inscrire" link="/signup" />
        </>
    );
};

export default NavHome;
