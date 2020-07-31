"use strict";

// Middleware Imports

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Database Route
const db = require("../db");

// GET Login User Controller

exports.login = (req, res, next) => {
  // Vérifie que les champs ne sont pas vides
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Veillez rentrer vos identifiants" });
  }

  // Requete de l'utilisateur sur la base de donnés

  const sql = "SELECT id, email, password FROM users WHERE email = ?";
  const query = db.query(sql, [email], (error, user) => {
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
        userId: user.id,
        token: jwt.sign(
          {
            userId: user.id,
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
