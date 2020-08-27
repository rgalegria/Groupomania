import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

// Icons
import back from "../../images/back-icon.svg";
import modify from "../../images/modify-icon.svg";

// Components
import NavBtn from "../../components/Buttons/NavBtn/NavBtn";

// Styles
import styles from "./Nav.module.css";

const NavProfile = (props) => {
    // Authentication context
    const auth = useContext(AuthContext);

    const userId = props.location.pathname.split("/")[2];

    let modifyBtn;

    if (auth.userId == userId) {
        modifyBtn = (
            <NavBtn id="update-profile" name="modifier" icon={modify} link={`/profile/${auth.userId}/update`} />
        );
    } else {
        modifyBtn = "";
    }

    return (
        <footer className={styles.btn_list}>
            <NavBtn id="back" name="retourner" icon={back} link="/posts" />
            {auth.userId && userId && modifyBtn}
        </footer>
    );
};

export default withRouter(NavProfile);
