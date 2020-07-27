"use strict";

// Middleware Imports

const mysqlx = require("@mysql/xdevapi");
const express = require("express");
const router = express.Router();

// Middleware Routes

const postCtrl = require("../controllers/posts");
// const auth = require("../middleware/auth");
// const multer = require("../middleware/multer-config");

// Routes

// router.post("/", auth, multer, postCtrl.createPost);
// router.post("/:id/like", auth, postCtrl.reactToPost);
// router.post("/:id/comments", auth, postCtrl.commentPost);
// router.get("/", auth, postCtrl.getAllPosts);
// router.get("/", auth, postCtrl.getMostLikedPosts);
// router.get("/:id", auth, postCtrl.getOnePost);
// router.put("/:id", auth, multer, postCtrl.modifyPost);
// router.put("/:id/comments/:id", auth, multer, postCtrl.modifyCommentPost);
// router.delete("/:id", auth, postCtrl.deletePost);

router.get("/", postCtrl.getAllPosts);

// Execution

module.exports = router;
