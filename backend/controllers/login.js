"use strict";

// Middleware Imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");

// Error Class
const HttpError = require("../models/http-error");

// Database Route
const db = require("../config/db");

// GET Login User Controller
exports.login = (req, res, next) => {
    const { email, password } = req.body;

    // Vérifie que les champs sont vides
    if (!email && !password) {
        return next(new HttpError("Veuillez rentrer vos identifiants", 400));
    }

    if (!email) {
        return next(new HttpError("Veuillez rentrer votre email", 400));
    }

    if (!password) {
        return next(new HttpError("Veuillez rentrer votre mot de passe", 400));
    }

    // Requete de l'utilisateur sur la base de données
    const string = "SELECT id, email, password, account FROM users WHERE email = ?";
    const inserts = [email];
    const sql = mysql.format(string, inserts);

    const query = db.query(sql, (error, user) => {
        // Vérifie que l'objet n'est pas vide (Utilisateur inexistant)
        if (user.length === 0) {
            return next(new HttpError("Votre adresse e-mail n'est pas valide", 401));
        }

        // Comparaison entre le hash et le mot de passe
        bcrypt.compare(password, user[0].password).then((valid) => {
            if (!valid) {
                return next(new HttpError("Votre mot de passe n'est pas valide", 401));
            }
            // Signe le id de l'utilisateur et retourne un JWT dans l'entête
            res.status(200).json({
                userId: user[0].id,
                account: user[0].account,
                token: jwt.sign(
                    {
                        userId: user[0].id,
                        account: user[0].account,
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: process.env.JWT_EXPIRES,
                    }
                ),
            });
        });
    });
};
