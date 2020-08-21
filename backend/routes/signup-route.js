"use strict";

// Middleware Imports

const express = require("express");
const router = express.Router();

// Routes

const userCtrl = require("../controllers/signup");

router.post("/", userCtrl.signup);

// Execution

module.exports = router;
