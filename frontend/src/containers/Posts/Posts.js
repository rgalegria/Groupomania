import React, { useState } from "react";

// Static Images
import dude from "./images/dude.jpg";
import girl from "./images/fille.jpg";
import post1 from "./images/post1.jpg";

// Components
import UserHeader from "./components/userHeader";
import Post from "./components/post";
import Comment from "./components/comment";
import TabBtn from "./components/btn_tab";
import NavBtn from "./components/btn_nav";

// Icons
import menu from "./images/menu-icon.svg";
import post from "./images/post-icon.svg";
import categories from "./images/categories-icon.svg";
import back from "./images/back-icon.svg";
import comment from "./images/comment-icon.svg";
import clock from "./images/clock-icon.svg";
import coffee from "./images/coffee-icon.svg";

// Styles
import "./App.css";

const App = (props) => {
    const [usersState /*, setUsersState*/] = useState([
        {
            id: 1,
            user_id: 1,
            firstName: "Jean",
            lastName: "DUPONT",
            photo_url: dude,
            post_date: "6d",
            category: "Drôle",
            title: "Le meilleur ami de l’homme",
            image_url: post1,
            likes: 25,
            dislikes: 18,
            comments: {
                "0": {
                    id: 2,
                    firstName: "Sheshuang",
                    lastName: "XIE",
                    photo_url: girl,
                    comment_date: "6d",
                    message: "Trop marrant !",
                },
            },
            reaction: "like",
        },
    ]);

    const [btnsState /*, setBtnsState*/] = useState([
        {
            name: "menu",
            icon: menu,
        },
        {
            name: "poste",
            icon: post,
        },
        {
            name: "catégories",
            icon: categories,
        },
        {
            name: "retourner",
            icon: back,
        },
        {
            name: "commentez",
            icon: comment,
        },
        {
            name: "À LA UNE",
            icon: clock,
        },
        {
            name: "LES PLUS AIMÉS",
            icon: coffee,
        },
    ]);

    return (
        <div className="App">
            <header className="header">
                <TabBtn icon={btnsState[5].icon} name={btnsState[5].name} />
                <TabBtn icon={btnsState[6].icon} name={btnsState[6].name} />
            </header>
            <div className="container">
                <div>
                    <UserHeader
                        photo_url={usersState[0].photo_url}
                        firstName={usersState[0].firstName}
                        lastName={usersState[0].lastName}
                        post_date={usersState[0].post_date}
                        category={usersState[0].category}
                    />
                    <Post
                        title={usersState[0].title}
                        image_url={usersState[0].image_url}
                        likes={usersState[0].likes}
                        dislikes={usersState[0].dislikes}
                        // comments={usersState[0].comments}
                    />
                </div>
                <div>
                    <UserHeader
                        photo_url={usersState[0].photo_url}
                        firstName={usersState[0].firstName}
                        lastName={usersState[0].lastName}
                        post_date={usersState[0].post_date}
                        category={usersState[0].category}
                    />
                    <Post
                        title={usersState[0].title}
                        image_url={usersState[0].image_url}
                        likes={usersState[0].likes}
                        dislikes={usersState[0].dislikes}
                        // comments={usersState[0].comments}
                    />
                    <UserHeader
                        photo_url={usersState[0].comments[0].photo_url}
                        firstName={usersState[0].comments[0].firstName}
                        lastName={usersState[0].comments[0].lastName}
                        post_date={usersState[0].comments[0].comment_date}
                        // category={usersState[0].comments[0].category}
                    />
                    <Comment />
                </div>
            </div>
            <div className="btn-list">
                <NavBtn icon={btnsState[0].icon} name={btnsState[0].name} />
                <NavBtn icon={btnsState[1].icon} name={btnsState[1].name} />
                <NavBtn icon={btnsState[2].icon} name={btnsState[2].name} />
                <NavBtn icon={btnsState[3].icon} name={btnsState[3].name} />
                <NavBtn icon={btnsState[4].icon} name={btnsState[4].name} />
            </div>
        </div>
    );
};

export default App;
