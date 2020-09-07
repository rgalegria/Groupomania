"use strict";

// Middleware Imports
const multer = require("multer");

// Middleware config.
const MIME_TYPE_MAP = {
    "image/jpg": "jpg",
    "image/jpeg": "jpeg",
    "image/png": "png",
    "image/gif": "gif",
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images");
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(" ").join("_");
        const extension = MIME_TYPE_MAP[file.mimetype];
        callback(null, name + Date.now() + "." + extension);
    },
});

// Export

module.exports = multer({ storage }).single("image");
