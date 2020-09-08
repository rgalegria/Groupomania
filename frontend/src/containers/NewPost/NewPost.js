import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import { useForm } from "../../hooks/form-hook";
import { useHttpRequest } from "../../hooks/httpRequest-hook";
import { MinLength, MaxLength } from "../../utils/validators";

// Components
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import SelectField from "../../components/SelectField/SelectField";
import InputField from "../../components/InputField/InputField";
import Spinner from "../../components/LoadingSpinner/LoadingSpinner";

// Styles
import styles from "./NewPost.module.css";

const NewPost = (props) => {
    // Authentication context
    const auth = useContext(AuthContext);

    // Backend Request Hook
    const { isLoading, /*error,*/ sendRequest /*clearError*/ } = useHttpRequest();

    // History context
    const history = useHistory();

    //Categories Hook
    //===========================================================================================
    const [categories, setCategories] = useState();

    //Fetch Categories
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const categories = await sendRequest(`${process.env.REACT_APP_API_URL}/posts/categories`, "GET", null, {
                    Authorization: "Bearer " + auth.token,
                });
                // console.log("categories =>", categories);
                setCategories(categories);
            } catch (err) {}
        };
        fetchPosts();
    }, [sendRequest, auth.token, setCategories]);

    // Form Hook
    //===========================================================================================
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

    // Send Post to Backend
    //===========================================================================================
    const sendPostHandler = async (event) => {
        event.preventDefault();
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
            <div className={styles.container}>
                <h2>No Data!</h2>
            </div>
        );
    }

    return (
        <>
            <header className={styles.head}>
                <div className={styles.tab}>
                    <div className={styles.tab_border}>
                        <h3 className={styles.title}>Nouvelle Publication</h3>
                    </div>
                </div>
            </header>

            <div className="container">
                {!isLoading && categories && (
                    <>
                        <form className={styles.form} id="send-post-form" onSubmit={sendPostHandler}>
                            <InputField
                                id="title"
                                // label="Titre du poste :"
                                name="title"
                                type="text"
                                placeholder="Titre ou message de la publication"
                                maxLength="100"
                                element="textarea"
                                hasLabel="no"
                                textIsWhite="no"
                                validators={[MinLength(3), MaxLength(100)]}
                                errorText="Veillez écrire un titre ou commentaire pour votre post"
                                onInput={inputHandler}
                                initialValue={formState.inputs.title.value}
                                initialValid={formState.inputs.title.isValid}
                            />
                            <ImageUpload
                                center
                                id="image"
                                onInput={inputHandler}
                                errorText="Choisisez une image ou gif"
                            />
                            <SelectField
                                id="category"
                                label="Categories :"
                                name="categories"
                                onInput={inputHandler}
                                options={categories}
                            />
                        </form>
                    </>
                )}
            </div>
        </>
    );
};

export default NewPost;