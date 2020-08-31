"use strict";

// Middleware Imports

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// Controller
const userCtrl = require("../controllers/user");

//=================================================================

// Read User Route
router.get("/:id", auth, userCtrl.getUserProfile);

// Update User Route
router.patch("/update", auth, multer, userCtrl.updateUserProfile);
router.put("/update", auth, userCtrl.updatePassword);

// Delete User Route
router.delete("/:id", auth, userCtrl.deleteProfile);

// Execution
module.exports = router;
