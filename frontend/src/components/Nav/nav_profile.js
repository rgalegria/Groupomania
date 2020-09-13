import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

// Icons
import back from "../../images/back-icon.svg";
import modify from "../../images/modify-icon.svg";

// Components
import NavBtn from "../../components/Buttons/NavBtn/NavBtn";

const NavProfile = (props) => {
    // Authentication context
    const auth = useContext(AuthContext);

    const userId = Number(props.location.pathname.split("/")[2]);

    let modifyBtn;

    if (auth.userId === userId) {
        modifyBtn = (
            <NavBtn
                id="update-profile"
                name="modifier"
                icon={modify}
                link={`/profile/${auth.userId}/update`}
                iconColor="icon_white"
            />
        );
    } else {
        modifyBtn = "";
    }

    return (
        <>
            <NavBtn id="back" name="retourner" icon={back} link="/posts" iconColor="icon_white" />
            {auth.userId && userId && modifyBtn}
        </>
    );
};

export default withRouter(NavProfile);
