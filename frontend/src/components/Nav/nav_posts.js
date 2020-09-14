import React from "react";

// Icons
import menu from "../../images/menu-icon.svg";
import post from "../../images/post-icon.svg";
import categories from "../../images/categories-icon.svg";

// Components
import NavBtn from "../../components/Buttons/NavBtn/NavBtn";

const NavPost = () => {
    return (
        <>
            <NavBtn id="menu" name="menu" icon={menu} link="/menu" iconColor="icon_white" />
            <NavBtn id="post" name="publier" icon={post} link="/posts/new" iconColor="icon_white" />
            <NavBtn id="categories" name="catégories" icon={categories} link="/posts" iconColor="icon_white" />
        </>
    );
};

export default NavPost;
