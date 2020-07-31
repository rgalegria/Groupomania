"use strict";

// Middleware Imports

const express = require("express");
const router = express.Router();
const bouncer = require("express-bouncer")(500, 900000);

// Routes

const userCtrl = require("../controllers/login");

router.post("/", bouncer.block, userCtrl.login);

// Execution

module.exports = router;
