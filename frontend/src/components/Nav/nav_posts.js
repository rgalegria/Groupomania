import React from "react";

// Icons
import menu from "../../images/menu-icon.svg";
import post from "../../images/post-icon.svg";
import categories from "../../images/categories-icon.svg";

// Components
import ActionBtn from "../../components/Buttons/ActionBtn/ActionBtn";
import NavBtn from "../../components/Buttons/NavBtn/NavBtn";

// Styles
import styles from "./Nav.module.css";

const NavPost = (props) => {
    return (
        <footer className={styles.btn_list}>
            <ActionBtn id="menu" name="menu" icon={menu} onClick={props.onClick} />
            <NavBtn id="post" name="post" icon={post} link="/posts/new" />
            <NavBtn id="categories" name="catégories" icon={categories} link="/posts" />
        </footer>
    );
};

export default NavPost;
