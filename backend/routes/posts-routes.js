"use strict";

// Middleware Imports
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// Controller
const postCtrl = require("../controllers/posts");

//=================================================================

// Create Posts Routes
router.post("/", auth, multer, postCtrl.createPost);
router.post("/like", auth, postCtrl.postReaction);
router.post("/:id", auth, postCtrl.postComment);

// Read Posts Routes
router.get("/", auth, postCtrl.getAllPosts);
router.get("/most-liked", auth, postCtrl.getMostLikedPosts);
router.get("/:id", auth, postCtrl.getOnePost);

// Delete Posts Routes
router.delete("/:id", auth, postCtrl.deletePost);
router.delete("/comment/:id", auth, postCtrl.deleteComment);

// Execution
module.exports = router;
