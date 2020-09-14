import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import { useForm } from "../../hooks/form-hook";
import { useWindowDimensions } from "../../hooks/window-hook";
import { useHttpRequest } from "../../hooks/httpRequest-hook";
import { MinLength, MaxLength } from "../../utils/validators";

// icons
import backIcon from "../../images/back-icon.svg";

// Components
import ErrorModal from "../../components/ErrorModal/ErrorModal";
import UIBtn from "../../components/Buttons/UIBtn/UIBtn";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import SelectField from "../../components/SelectField/SelectField";
import InputField from "../../components/InputField/InputField";
import Spinner from "../../components/LoadingSpinner/LoadingSpinner";

// Styles
import styles from "./NewPost.module.css";

const NewPost = (props) => {
    // Authentication context
    const auth = useContext(AuthContext);

    // History context
    const history = useHistory();

    // Request Hook
    const { isLoading, error, sendRequest, clearError } = useHttpRequest();

    // Window Size
    const { width } = useWindowDimensions();

    //Categories State
    const [categories, setCategories] = useState();

    // Form State
    const [formState, inputHandler] = useForm(
        {
            title: {
                value: "",
                isValid: false,
            },
            category: {
                value: null,
                isValid: false,
            },
            image: {
                value: null,
                isValid: false,
            },
        },
        false
    );

    //Fetch Categories
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const categories = await sendRequest(`${process.env.REACT_APP_API_URL}/posts/categories`, "GET", null, {
                    Authorization: "Bearer " + auth.token,
                });

                setCategories(categories);
            } catch (err) {}
        };
        fetchPosts();
    }, [sendRequest, auth.token, setCategories]);

    // Send Post au Backend
    const sendPostHandler = async (event) => {
        event.preventDefault();

        if (!formState.isValid) {
            return;
        }

        const formData = new FormData();
        formData.append("title", formState.inputs.title.value);
        formData.append("category", formState.inputs.category.value);
        formData.append("image", formState.inputs.image.value);

        // console.log("To Backend =>", formData);
        try {
            await sendRequest(`${process.env.REACT_APP_API_URL}/posts`, "POST", formData, {
                Authorization: "Bearer " + auth.token,
            });
            history.push(`/posts`);
        } catch (err) {}
    };

    // Back Button
    const backHandle = (e) => {
        e.preventDefault();
        props.history.goBack();
    };

    // Affichage des boutons pour Desktop
    let sendBtn;
    let backBtn;

    if (width >= 1024) {
        sendBtn = (
            <div className={styles.send_btn}>
                <UIBtn id="send-post-btn" form="send-post-form" name="Publier" type="submit" btnType="valid" />
            </div>
        );
        backBtn = (
            <button className={styles.back_btn} onClick={backHandle}>
                <img className="icon_red" src={backIcon} alt="" />
            </button>
        );
    }

    if (isLoading) {
        return (
            <div className={styles.container}>
                <div className="spinner">
                    <Spinner />
                </div>
            </div>
        );
    }

    if (!categories) {
        return (
            <>
                <ErrorModal error={error} onClear={clearError} />
                <div className={styles.container}>
                    <h2>No Data!</h2>
                </div>
            </>
        );
    }

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            {!isLoading && categories && (
                <>
                    <header className={styles.head}>
                        <div className={styles.tab}>
                            {backBtn}
                            <div className={styles.tab_border}>
                                <h3 className={styles.title}>Nouvelle Publication</h3>
                            </div>
                        </div>
                    </header>
                    <div className="container">
                        <form className={styles.form} id="send-post-form" onSubmit={sendPostHandler}>
                            <InputField
                                id="title"
                                name="title"
                                type="text"
                                placeholder="Titre ou message de la publication"
                                maxLength="100"
                                element="textarea"
                                hasLabel="no"
                                textIsWhite="no"
                                validators={[MinLength(2), MaxLength(100)]}
                                errorText="Veuillez écrire un commentaire pour votre publication"
                                onInput={inputHandler}
                                initialValue={formState.inputs.title.value}
                                initialValid={formState.inputs.title.isValid}
                            />
                            <ImageUpload
                                center
                                id="image"
                                onInput={inputHandler}
                                errorText="Choisissez une image ou un gif"
                            />
                            <SelectField
                                id="category"
                                label="Catégories :"
                                name="catégories"
                                onInput={inputHandler}
                                options={categories}
                                errorText="Choisissez une catégorie"
                            />
                            {sendBtn}
                        </form>
                    </div>
                </>
            )}
        </>
    );
};

export default NewPost;
