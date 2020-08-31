"use strict";

// Middleware Imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");

// Database Route
const db = require("../config/db");

// GET Login User Controller
exports.login = (req, res, next) => {
    const { email, password } = req.body;

    // Vérifie que les champs sont vides
    if (!email || !password) {
        return res.status(400).json({ error: "Veillez rentrer vos identifiants" });
    }

    // Requete de l'utilisateur sur la base de donnés
    const string = "SELECT id, email, password, account FROM users WHERE email = ?";
    const inserts = [email];
    const sql = mysql.format(string, inserts);

    const query = db.query(sql, (error, user) => {
        // Vérifie que l'object ne soit pas vide (Utilisateur inexistant)
        if (user.length === 0) {
            return res.status(401).json({
                error: "Votre adresse e-mail n'est pas valide",
            });
        }

        // Comparaison entre le hash et le mot de passe
        bcrypt.compare(password, user[0].password).then((valid) => {
            if (!valid) {
                return res.status(401).json({
                    error: "Votre mot de passe n'est pas valide",
                });
            }
            // Signe le id de l'utilisateur et retourne un JWT dans l'entete
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
