"use strict";

// Middleware Imports

const bcrypt = require("bcrypt");
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

// POST Create User Controller

// CREAR CASO DONDE ES DUPLICADO EN LA BD (USUARIO YA REGISTRADO)
exports.signin = (req, res, next) => {
  // RegEx Text
  const regExText = /^[A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ \'\- ]+$/i;

  // Validation donnés de l'utilisateur
  let isFirstName = validator.matches(req.body.firstName, regExText);
  let isLastName = validator.matches(req.body.lastName, regExText);
  let isEmail = validator.isEmail(req.body.email);
  let isPassword = passValid.validate(req.body.password, options).valid;

  if (isFirstName && isLastName && isEmail && isPassword) {
    // Hash du mot de pass de l'utilisateur

    bcrypt.hash(req.body.password, 10, (error, hash) => {
      const values = [
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        hash,
      ];

      // Enregistrement des donnés de l'utilisateur sur la BD MySQL
      const sql =
        "INSERT INTO users (firstName, lastName, email, password) VALUES (?)";
      const query = db.query(sql, [values], (error, user) => {
        if (!error) {
          res.status(201).json({
            message: "User created successfully!",
          });
        } else {
          res.status(400).json({
            error,
          });
        }
      });
    });
  } else if (!isFirstName || !isLastName || !isEmail || !isPassword) {
    // Error Handling

    let errorMessages = [];

    let anws = !isFirstName ? errorMessages.push(" Prénom") : "";
    anws = !isLastName ? errorMessages.push(" Nom") : "";
    anws = !isEmail ? errorMessages.push(" E-mail") : "";
    anws = !isPassword ? errorMessages.push(" Mot de passe") : "";
    errorMessages = errorMessages.join();

    return res.status(400).json({
      error: "Veillez vérifier les champs suivants :" + errorMessages,
    });
  }
};
