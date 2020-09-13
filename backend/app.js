"use strict";

// Middleware Imports
const express = require("express");
const path = require("path");
require("dotenv").config();

// App security
const helmet = require("helmet");
const bouncer = require("express-bouncer")(10000, 600000, 5);
const toobusy = require("toobusy-js");
const sanitizeMiddleware = require("sanitize-middleware");

// Error Class
const HttpError = require("./models/http-error");

// App Routes
const signupRoutes = require("./routes/signup-route");
const loginRoutes = require("./routes/login-route");
const userRoutes = require("./routes/user-routes");
const postRoutes = require("./routes/posts-routes");

// Initialize express App
const app = express();

// Helmet Middleware (Firewall)
app.use(helmet());

// CORS Control Headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});

// Bouncer Middleware (Brute force Attack)
bouncer.blocked = function (req, res, next, remaining) {
    res.status(429).send("Too many requests have been made, " + "please wait " + remaining / 1000 + " seconds");
};

// Too Busy Middleware (DoS Attacks)
app.use(function (req, res, next) {
    if (toobusy()) {
        res.status(503).send("Server Too Busy");
    } else {
        next();
    }
});

// Express Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sanitize Middleware (Inyection Attacks)
app.use(sanitizeMiddleware());

// Access Routes
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/signup", signupRoutes);
app.use("/login", loginRoutes);
app.use("/profile", userRoutes);
app.use("/posts", postRoutes);

// Error Handling 404
app.use((req, res, next) => {
    const error = new HttpError("Route non trouvé", 404);
    throw error;
});

// Error Handling App
app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "Un problème est survenu sur le serveur, veillez réessayer ultérieurement" });
});

// App Execution
module.exports = app;
