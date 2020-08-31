"use strict";

// Middleware Imports
const bcrypt = require("bcrypt");
const mysql = require("mysql");
const validator = require("validator");
const passValid = require("secure-password-validator");
// const passBlackList = require("secure-password-validator/build/main/blacklists/first10_000");

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

// GET User Profile Controller
//==========================================================================================================
exports.getUserProfile = (req, res, next) => {
    const { id } = req.params;

    const string = "SELECT * FROM users WHERE id = ?";
    const inserts = [id];
    const sql = mysql.format(string, inserts);

    const query = db.query(sql, (error, profile) => {
        if (!error) {
            res.status(200).json(profile[0]);
        } else {
            res.status(400).json({ error });
        }
    });
};

// PUT Update Profile Photo Controller
//==========================================================================================================
exports.updateUserPhoto = (req, res, next) => {
    const user_id = decodeUid(req.headers.authorization);
    const photoUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;

    const string = "UPDATE users SET photo_url = ? WHERE id = ?";
    const inserts = [photoUrl, user_id];
    const sql = mysql.format(string, inserts);

    const updatePhoto = db.query(sql, (error, post) => {
        if (!error) {
            res.status(201).json({ message: "Post saved successfully!" });
        } else {
            res.status(400).json({ error });
        }
    });
};

// PATCH User Profile Update Controller
//==========================================================================================================
exports.updateUserProfile = (req, res, next) => {
    const { id, firstName, lastName, email, department, role, linkedin_url } = req.body;

    // Validation des donnés
    let isFirstName = validator.matches(firstName, regExText);
    let isLastName = validator.matches(lastName, regExText);
    let isEmail = validator.isEmail(email);
    let isDepartment = validator.matches(department, regExText);
    let isRole = validator.matches(role, regExText);
    let isLinkedinUrl = validator.isURL(linkedin_url, [["http", "https"]]);

    if (isFirstName && isLastName && isEmail && isDepartment && isRole && isLinkedinUrl) {
        const inserts = [firstName, lastName, email, department, role, linkedin_url, id];
        const string =
            "UPDATE users SET firstName = ?, lastName = ?, email = ?,  department = ?, role = ?, linkedin_url = ? WHERE id = ?";
        const sql = mysql.format(string, inserts);

        const query = db.query(sql, (error, profile) => {
            if (!error) {
                res.status(200).json({ message: "User Updated successfully!" });
            } else {
                res.status(400).json({ error });
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

        return res.status(400).json({
            message: "Veillez vérifier les champs suivants :" + errorMessages,
        });
    }
};

// PUT Update User Password Controller
//==========================================================================================================
exports.updatePassword = (req, res, next) => {
    const { id, password } = req.body;

    if (passValid.validate(password, options).valid) {
        bcrypt.hash(req.body.password, 10).then((hash) => {
            const string = "UPDATE users SET password = ? WHERE id = ? ";
            const inserts = [hash, id];
            const sql = mysql.format(string, inserts);

            const query = db
                .query(sql, (error, password) => {
                    if (!error) {
                        res.status(201).json({ message: "Password Updated successfully!" });
                    } else {
                        res.status(400).json({ error });
                    }
                })
                .catch((error) => res.status(400).json({ error }));
        });
    } else {
        res.status(400).json({ error: "Votre mot de passe n'est pas valide" });
    }
};

// DELETE User Controller
//==========================================================================================================
exports.deleteProfile = (req, res, next) => {
    const { userId } = req.body;

    console.log("userid:", userId);

    const string = "DELETE FROM users WHERE id = ? ";
    const inserts = [userId];
    const sql = mysql.format(string, inserts);

    const query = db.query(sql, [userId], (error, result) => {
        if (error) throw error;
        res.status(200).json({ message: "User deleted successfully!" });
    });
};
