"use strict";

// Middleware Imports

const express = require("express");
const router = express.Router();

// Routes

const userCtrl = require("../controllers/signin");

router.post("/", userCtrl.signin);

// Execution

module.exports = router;
