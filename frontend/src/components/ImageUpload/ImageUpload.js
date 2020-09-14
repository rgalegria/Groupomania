import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

// Icons
import Image from "../../images/image-icon.svg";

// Images
import GenProfile from "../../images/generic_profile_picture.jpg";

// Styles
import styles from "./ImageUpload.module.css";

const ImageUpload = (props) => {
    // Use state de l'image
    const [file, setFile] = useState();

    // Use state de la previsualisation de l'image
    const [previewUrl, setPreviewUrl] = useState();

    // Use state de la validation
    const [isValid, setIsValid] = useState(false);

    // Localisation actuelle de l'app
    const path = props.location.pathname;

    useEffect(() => {
        // verification s'il y a une image ou pas dans le useState
        if (!file) {
            return;
        }

        // Accéder à la previsualisation de l'image du navigateur et le transferer au useState
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }, [file]);

    // Fontion qui prend l'image
    const pickedImageHandler = (event) => {
        let pickedFile;
        let fileIsValid = isValid;

        // S'il y a une image dans l'événement
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        } else {
            setIsValid(false);
            fileIsValid = false;
        }
        props.onInput(props.id, pickedFile, fileIsValid);
    };

    // Construction pour la page new post
    if (path === "/posts/new") {
        return (
            <>
                <label htmlFor="upload-button" className={styles.image_container}>
                    {previewUrl ? (
                        <>
                            <img
                                className={styles.preview_post}
                                src={previewUrl}
                                alt="Prévisualisation de la publication"
                            />
                            <div className={styles.red_banner_post}>
                                <span className={styles.banner_text_post}>changer l'image</span>
                            </div>
                        </>
                    ) : (
                        <div className={styles.icon_block}>
                            <img className={styles.icon} src={Image} alt="" />
                            <span className={styles.text}>Veuillez choisir une image en cliquant ici</span>
                        </div>
                    )}
                </label>
                <input
                    type="file"
                    accept=".jpeg,.jpg,.gif"
                    id="upload-button"
                    style={{ display: "none" }}
                    onChange={pickedImageHandler}
                />
            </>
        );
    }

    // Construction pour la page Update Profile
    return (
        <>
            <label htmlFor="upload-button" className={styles.photo_container}>
                {previewUrl ? (
                    <>
                        <img className={styles.preview_img} src={previewUrl} alt="Prévisualisation du profil" />

                        <div className={styles.red_banner}>
                            <span className={styles.banner_text}>changer</span>
                        </div>
                    </>
                ) : (
                    <div>
                        <img className={styles.profile_photo} src={props.photo_url || GenProfile} alt="" />
                        <div className={styles.red_banner}>
                            <span className={styles.banner_text}>changer</span>
                        </div>
                    </div>
                )}
            </label>
            <input
                type="file"
                accept=".jpeg,.jpg"
                id="upload-button"
                style={{ display: "none" }}
                onChange={pickedImageHandler}
            />
        </>
    );
};

export default withRouter(ImageUpload);
