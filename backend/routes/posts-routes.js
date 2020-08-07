"use strict";

// Middleware Imports

const express = require("express");
const router = express.Router();

// Middleware Routes

const postCtrl = require("../controllers/posts");
// const auth = require("../middleware/auth");
// const multer = require("../middleware/multer-config");

// Routes Create

// router.post("/", auth, multer, postCtrl.createPost);
router.post("/", postCtrl.createPost);

// router.post("/:id/like", auth, postCtrl.reactToPost);
// router.post("/:id/comments", auth, postCtrl.commentPost);

// Routes Read

// router.get("/", auth, postCtrl.getAllPosts);
router.get("/", postCtrl.getAllPosts);

// router.get("/", auth, postCtrl.getMostLikedPosts);
router.get("/mosted-liked", postCtrl.getMostLikedPosts);

// router.get("/:id", auth, postCtrl.getOnePost);
router.get("/:id", postCtrl.getOnePost);

// Routes Update

// router.put("/:id", auth, multer, postCtrl.modifyPost);
// router.put("/:id", postCtrl.modifyPost);

// Routes Delete

// router.delete("/:id", auth, postCtrl.deletePost);
router.delete("/:id", postCtrl.deletePost);

// router.delete("/:id/comments/:id", auth, postCtrl.deleteComment);
// router.delete("/:id/comments/:id", postCtrl.deleteComment);

// Execution

module.exports = router;
