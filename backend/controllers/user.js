"use strict";

// Middleware Imports

const bcrypt = require("bcrypt");
const validator = require("validator");
const passValid = require("secure-password-validator");
// const passBlackList = require("secure-password-validator/build/main/blacklists/first10_000");

// Database Route
const db = require("../db");

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

// RegEX Texte
const regExText = /^[A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ \'\- ]+$/i;

// GET User Profile Controller

exports.getUserProfile = (req, res, next) => {
  const { id } = req.body;
  const sql = "SELECT * FROM users WHERE id = ?";
  const query = db.query(sql, [id], (error, profile) => {
    if (!error) {
      res.status(200).json(profile);
    } else {
      res.status(400).json({ error });
    }
  });
};

// PUT User Profile Update Controller

// CASO DONDE EL USUARIO SOLO ACTUALIZA CIERTOS CASOS

exports.updateUserProfile = (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    photo_url,
    department,
    role,
    linkedin_url,
    id,
  } = req.body;

  // Validation des donnés
  let isFirstName = validator.matches(firstName, regExText);
  let isLastName = validator.matches(lastName, regExText);
  let isEmail = validator.isEmail(email);
  let isDepartment = validator.matches(department, regExText);
  let isRole = validator.matches(role, regExText);
  let isLinkedinUrl = validator.isURL(linkedin_url, [["http", "https"]]);

  if (
    isFirstName &&
    isLastName &&
    isEmail &&
    isDepartment &&
    isRole &&
    isLinkedinUrl
  ) {
    // Hash du mot de pass de l'utilisateur
    const values = [
      firstName,
      lastName,
      email,
      photo_url,
      department,
      role,
      linkedin_url,
      id,
    ];
    // let values = [firstName, lastName, email, photo_url, department, role, linkedin_url, id,];
    const sql =
      "UPDATE users SET firstName = ?, lastName = ?, email = ?, photo_url = ?, department = ?, role = ?, linkedin_url = ? WHERE id = ?";
    const query = db.query(sql, values, (error, profile) => {
      if (!error) {
        res.status(200).json({ message: "User Updated successfully!" });
      } else {
        res.status(400).json({ error });
      }
    });
  } else if (
    !isFirstName ||
    !isLastName ||
    !isEmail ||
    !isDepartment ||
    !isRole ||
    !isLinkedinUrl
  ) {
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
      error: "Veillez vérifier les champs suivants :" + errorMessages,
    });
  }
};

// PUT Update User Password Controller

exports.updatePassword = (req, res, next) => {
  const { id, password } = req.body;
  if (passValid.validate(password, options).valid) {
    bcrypt.hash(req.body.password, 10).then((hash) => {
      const sql = "UPDATE users SET password = ? WHERE id = ? ";
      const query = db
        .query(sql, [hash, id], (error, password) => {
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

exports.deleteProfile = (req, res, next) => {
  const { id } = req.body;
  const sql = "DELETE FROM users WHERE id = ? ";
  const query = db.query(sql, [id], (error, result) => {
    if (error) throw error;
    res.status(200).json({ message: "User deleted successfully!" });
  });
};
