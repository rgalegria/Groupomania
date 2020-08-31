"use strict";

// Middleware Imports
const jwt = require("jsonwebtoken");

// Middleware config.
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw "Invalid user ID";
        } else {
            //pasar datos?
            next();
        }
    } catch {
        res.status(401).json({ error: new Error("Invalid request!") });
    }
};
