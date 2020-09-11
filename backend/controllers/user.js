"use strict";

// Middleware Imports
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mysql = require("mysql");
const fs = require("fs");
const validator = require("validator");
const passValid = require("secure-password-validator");
// const passBlackList = require("secure-password-validator/build/main/blacklists/first10_000");

// Error Class
const HttpError = require("../models/http-error");

// Database Route
const db = require("../config/db");

// Password Validator Options
const options = {
    // min password length, default = 8, cannot be less than 8
    minLength: 8,
    // max password length, default = 100, cannot be less than 50
    maxLength: 50,
    //array with blacklisted passwords default black list with first 1000 most common passwords
    // blacklist: passBlackList,
    // password Must have numbers, default = false
    digits: true,
    // password Must have letters, default = false
    letters: true,
    // password Must have uppercase letters, default = false
    uppercase: true,
    // password Must have lowercase letters, default = false
    lowercase: true,
    // password Must have symbols letters, default = false
    symbols: false,
};

// RegEX Text
const regExText = /^[A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ \'\- ]+$/i;

// UserID decoder
const decodeUid = (authorization) => {
    const token = authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return {
        id: decodedToken.userId,
        clearance: decodedToken.account,
    };
};

// GET User Profile Controller
//==========================================================================================================
exports.getUserProfile = (req, res, next) => {
    const { id } = req.params;

    const string =
        "SELECT firstName, lastName, email, photo_url, department, role, linkedin_url FROM users WHERE id = ?";
    const inserts = [id];
    const sql = mysql.format(string, inserts);

    const query = db.query(sql, (error, profile) => {
        if (!error) {
            res.status(200).json(profile[0]);
        } else {
            return next(new HttpError("Utilisateur non trouvé", 404));
        }
    });
};

// PATCH User Profile Update Controller
//==========================================================================================================
exports.updateUserProfile = (req, res, next) => {
    const user = decodeUid(req.headers.authorization);
    const { firstName, lastName, email, department, role, linkedin_url } = req.body;

    let imageUrl;

    if (req.body.image === "null") {
        imageUrl;
        // console.log("actualiza solo datos");
    } else if (req.file) {
        imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
        // console.log("hubo imagen nueva");
    } else {
        imageUrl = req.body.image;
        // console.log("ya tiene imagen pero solo actualiza datos");
    }

    // Validation des donnés
    let isFirstName = validator.matches(firstName, regExText);
    let isLastName = validator.matches(lastName, regExText);
    let isEmail = validator.isEmail(email);
    let isDepartment = validator.matches(department, regExText);
    let isRole = validator.matches(role, regExText);
    let isLinkedinUrl = validator.isURL(linkedin_url, [["http", "https"]]);

    if (isFirstName && isLastName && isEmail && isDepartment && isRole && isLinkedinUrl) {
        const string =
            "UPDATE users SET firstName = ?, lastName = ?, email = ?, photo_url = ?,  department = ?, role = ?, linkedin_url = ? WHERE id = ?";
        const inserts = [firstName, lastName, email, imageUrl, department, role, linkedin_url, user.id];
        const sql = mysql.format(string, inserts);

        const query = db.query(sql, (error, profile) => {
            if (!error) {
                res.status(200).json({ message: "User Updated successfully!" });
            } else {
                return next(new HttpError("Erreur de requête, la mise-à-jour du profil n'a pas été faite", 500));
            }
        });
    } else if (!isFirstName || !isLastName || !isEmail || !isDepartment || !isRole || !isLinkedinUrl) {
        // Error Handling

        let errorMessages = [];

        let anws = !isFirstName ? errorMessages.push(" Prénom") : "";
        anws = !isLastName ? errorMessages.push(" Nom") : "";
        anws = !isEmail ? errorMessages.push(" E-mail") : "";
        anws = !isDepartment ? errorMessages.push(" Departement") : "";
        anws = !isRole ? errorMessages.push(" Poste") : "";
        anws = !isLinkedinUrl ? errorMessages.push(" LinkedIn") : "";

        errorMessages = errorMessages.join();

        return next(new HttpError("Veillez vérifier les champs suivants :" + errorMessages, 400));
    }
};

// PUT Update User Password Controller
//==========================================================================================================
exports.updatePassword = (req, res, next) => {
    const user = decodeUid(req.headers.authorization);
    const { password } = req.body;

    if (passValid.validate(password, options).valid) {
        bcrypt.hash(req.body.password, 10).then((hash) => {
            const string = "UPDATE users SET password = ? WHERE id = ? ";
            const inserts = [hash, user.id];
            const sql = mysql.format(string, inserts);

            const query = db.query(sql, (error, password) => {
                if (!error) {
                    res.status(201).json({ message: "Password Updated successfully!" });
                } else {
                    return next(
                        new HttpError("Erreur de requête, la mise-à-jour du mot de passe n'a pas été faite", 500)
                    );
                }
            });
        });
    } else {
        return next(new HttpError("Votre mot de passe n'est pas valide", 401));
    }
};

// DELETE User Controller
//==========================================================================================================
exports.deleteProfile = (req, res, next) => {
    const user = decodeUid(req.headers.authorization);

    console.log("fijo no son strings =>", user.id, Number(req.params.id));

    if (user.id === Number(req.params.id)) {
        const string = "DELETE FROM users WHERE id = ? ";
        const inserts = [user.id];
        const sql = mysql.format(string, inserts);

        const query = db.query(sql, (error, result) => {
            if (!error) {
                res.status(200).json({ message: "User deleted successfully!" });
            } else {
                return next(new HttpError("Erreur de requête, l'utilisateur/trice n'a pas été supprimé(e)", 500));
            }
        });
    } else {
        res.status(401).json({ message: "Non Autorisé !" });
    }
};
