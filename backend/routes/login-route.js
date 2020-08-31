"use strict";

// Middleware Imports
const express = require("express");
const router = express.Router();

// Controller
const userCtrl = require("../controllers/login");

//=================================================================

// Login User Route
router.post("/", userCtrl.login);

// Execution
module.exports = router;
