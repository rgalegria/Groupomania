import React from "react";

// Static Images
import logo from "../../images/logo.png";

// Styles
import "./Home.css";

const Home = (props) => {
    return (
        <div className="background_image">
            <img src={logo} className="logo" alt="Logo de Groupomania, entreprise de grand distribution européen" />
            <div className="welcome">
                <h3 className="title">Bienvenue</h3>
                <p className="message">au resseau social pour partager avec vos collègues !</p>
            </div>
        </div>
    );
};

export default Home;
