"use strict";

// Middleware Imports

const jwt = require("jsonwebtoken");

// Middleware config.

module.exports = (req, res, next) => {
    console.log("request:", req.body);
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            console.log("error de ID");
            throw "Invalid user ID";
        } else {
            next();
        }
    } catch (error) {
        console.log("error de catch");
        res.status(401).json({ error: error });
    }
};
