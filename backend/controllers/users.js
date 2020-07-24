"use strict";

// Middleware Imports

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const passValid = require("secure-password-validator");
const passBlackList = require("secure-password-validator/build/main/blacklists/first10_000");

// Route Mongoose Model

const User = require("../models/User");

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

// GET Login User Controller

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ error: "Votre adresse e-mail n'est pas valide" });
      }
      bcrypt.compare(req.body.password, user.password).then((valid) => {
        if (!valid) {
          return res
            .status(401)
            .json({ error: "Votre mot de passe n'est pas valide" });
        }
        res.status(200).json({
          userId: user._id,
          token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
            expiresIn: "24h",
          }),
        });
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

// POST Create User Controller

exports.signup = (req, res, next) => {
  if (
    validator.isEmail(req.body.email) &&
    passValid.validate(req.body.password, options).valid
  ) {
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        const user = new User({
          email: req.body.email,
          password: hash,
        });
        user
          .save()
          .then(() =>
            res.status(201).json({
              message: "User created successfully!",
            })
          )
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  } else if (
    !validator.isEmail(req.body.email) ||
    !passValid.validate(req.body.password, options).valid
  ) {
    return res.status(400).json({
      error: "Votre adresse e-mail et mot de passe ne sont pas valides",
    });
  }
};
