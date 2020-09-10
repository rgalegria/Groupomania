"use strict";

// Middleware Imports
const jwt = require("jsonwebtoken");

// Error Class
const HttpError = require("../models/http-error");

// Middleware config.
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw next(new HttpError("Non authorisé", 401));
        } else {
            //pasar datos?
            next();
        }
    } catch {
        return next(new HttpError("Non identifié(e)", 401));
    }
};
