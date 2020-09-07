"use strict";

// Middleware Imports
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const fs = require("fs");

// Database Route
const db = require("../config/db");

// UserID decoder
const decodeUid = (authorization) => {
    const token = authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return {
        id: decodedToken.userId,
        clearance: decodedToken.account,
    };
};

// POST Create Posts Controller
//==========================================================================================================
exports.createPost = (req, res, next) => {
    const user = decodeUid(req.headers.authorization);
    const { title, category } = req.body;
    const imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;

    // console.log("Req.Body =>", req.body, imageUrl, user.id);
    const string = "INSERT INTO posts (Users_id, Categories_id, title, image_url) VALUES (?, ?, ?, ? )";
    const inserts = [user.id, category, title, imageUrl];
    const sql = mysql.format(string, inserts);

    const createPost = db.query(sql, (error, post) => {
        if (!error) {
            res.status(201).json({ message: "Post saved successfully!" });
        } else {
            res.status(400).json({ error });
        }
    });
};

// POST Create Comment Controller
//==========================================================================================================
exports.postComment = (req, res, next) => {
    const user = decodeUid(req.headers.authorization);
    const { postId, message } = req.body;

    console.log("user info =>", user);

    const string = "INSERT INTO comments (Users_id, Posts_id, message) VALUES (?, ?, ?)";
    const inserts = [user.id, postId, message];
    const sql = mysql.format(string, inserts);

    const createComment = db.query(sql, (error, comment) => {
        if (!error) {
            console.log("MySQL Res =>", comment);
            res.status(201).json({ message: "Comment Posted successfully!" });
        } else {
            res.status(400).json({ error });
        }
    });
};

// GET Post Categories Controller
//==========================================================================================================
exports.getCategories = (req, res, next) => {
    const sql = "SELECT * FROM categories";
    const query = db.query(sql, (error, results) => {
        if (error) throw error;
        res.status(200).json(results);
    });
};

// GET All Posts Controller
//==========================================================================================================
exports.getAllPosts = (req, res, next) => {
    // Obtenir l'user ID
    const user = decodeUid(req.headers.authorization);

    // Fetch liste de 10 posts
    const getPosts = () => {
        return new Promise((resolve, reject) => {
            try {
                const sqlString = `SELECT
                                        u.id AS user_id,
                                        u.firstName,
                                        u.lastName,
                                        u.photo_url,
                                        p.title,
                                        p.post_date,
                                        p.image_url,
                                        p.id AS post_id,
                                        c.category,
                                    COUNT(if(r.reaction = 'like', 1, NULL)) AS likes,
                                    COUNT(if(r.reaction = 'dislike', 1, NULL)) AS dislikes,
                                        (SELECT reaction FROM reactions WHERE Users_id = 2 AND  Posts_id = r.Posts_id) AS userReaction
                                    FROM posts AS p
                                    LEFT JOIN reactions AS r ON p.id = r.Posts_id
                                    JOIN categories AS c ON p.Categories_id = c.id
                                    JOIN users AS u ON p.Users_id = u.id
                                    GROUP BY p.id ORDER BY post_date DESC`;
                const inserts = [user.id];
                const sql = mysql.format(sqlString, inserts);

                // MySQL DB Query
                const getPosts = db.query(sql, (error, posts) => {
                    if (error) reject(error);
                    resolve(posts);
                });
            } catch (err) {
                reject(err);
            }
        });
    };

    // Fetch comments par post
    const getCommentCount = (post_id) => {
        return new Promise((resolve, reject) => {
            try {
                const string = "SELECT COUNT(*) as comments FROM comments WHERE Posts_id = ?";
                const inserts = [post_id];

                const sql = mysql.format(string, inserts);

                // MySQL DB Query
                const commentCount = db.query(sql, (error, comments) => {
                    if (error) reject(error);
                    resolve(comments[0].comments);
                });
            } catch (err) {
                reject(err);
            }
        });
    };

    // Fetch reaction par post
    const composePost = async () => {
        try {
            //consultamos los posts
            let finalPost = await getPosts();
            for (let i = 0; i < finalPost.length; i++) {
                //consultamos los comentarios
                const comments = await getCommentCount(finalPost[i].post_id);
                finalPost[i].comments = comments;
            }

            return finalPost;
        } catch (err) {
            // console.log("error de finalPost:", err.stack);
            return new Error(err);
        }
    };

    composePost()
        .then((result) => {
            //console.log("error:", result);
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(400).json(error);
        });
};

// GET Most Liked Posts Controller
//==========================================================================================================
exports.getMostLikedPosts = (req, res, next) => {
    // Obtenir l'user ID
    const user = decodeUid(req.headers.authorization);

    // Consulta los 10 posts con mas likes
    const getMostLiked = () => {
        return new Promise((resolve, reject) => {
            try {
                const sqlString = `SELECT
                                        u.id AS user_id,
                                        u.firstName,
                                        u.lastName,
                                        u.photo_url,
                                        p.title,
                                        p.post_date,
                                        p.image_url,
                                        p.id AS post_id,
                                        c.category,
                                    COUNT(if(r.reaction = 'like', 1, NULL)) AS likes,
                                    COUNT(if(r.reaction = 'dislike', 1, NULL)) AS dislikes,
                                        (SELECT reaction FROM reactions WHERE Users_id = 2 AND Posts_id = r.Posts_id) AS userReaction
                                    FROM posts AS p
                                    LEFT JOIN reactions AS r ON p.id = r.Posts_id
                                    JOIN categories AS c ON p.Categories_id = c.id
                                    JOIN users AS u ON p.Users_id = u.id
                                    GROUP BY p.id ORDER BY likes DESC`;
                const inserts = [user.id];
                const sql = mysql.format(sqlString, inserts);
                // MySQL DB Query
                const getPosts = db.query(sql, (error, posts) => {
                    if (error) reject(error);
                    resolve(posts);
                });
            } catch (err) {
                reject(err);
            }
        });
    };

    // Fetch comments par post
    const getCommentCount = (post_id) => {
        return new Promise((resolve, reject) => {
            try {
                const string = "SELECT COUNT(*) as comments FROM comments WHERE Posts_id = ?";
                const inserts = [post_id];
                const sql = mysql.format(string, inserts);

                // MySQL DB Query
                const commentCount = db.query(sql, (error, comments) => {
                    if (error) reject(error);
                    resolve(comments[0].comments);
                });
            } catch (err) {
                reject(err);
            }
        });
    };

    // Fetch reaction par post
    const composePost = async () => {
        try {
            //consultamos los posts
            let finalPost = await getMostLiked();
            for (let i = 0; i < finalPost.length; i++) {
                //consultamos los comentarios
                const comments = await getCommentCount(finalPost[i].post_id);
                finalPost[i].comments = comments;
            }

            return finalPost;
        } catch (err) {
            //console.log("error de finalPost:", err.stack);
            return new Error(err);
        }
    };

    composePost()
        .then((result) => {
            console.log("error:", result);
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(400).json(error);
        });
};

// GET One Posts Controller
//==========================================================================================================
exports.getOnePost = (req, res, next) => {
    const user = decodeUid(req.headers.authorization);
    let postId = req.params.id;

    const postSql = `SELECT
                        u.id AS user_id,
                        u.firstName,
                        u.lastName,
                        u.photo_url,
                        p.title,
                        p.post_date,
                        p.image_url,
                        p.id AS post_id,
                        c.category,
                    COUNT(if(r.reaction = 'like', 1, NULL)) AS likes,
                    COUNT(if(r.reaction = 'dislike', 1, NULL)) AS dislikes,
                        (SELECT reaction FROM reactions WHERE Users_id = ? AND Posts_id = r.Posts_id) AS userReaction
                    FROM posts AS p
                    LEFT JOIN reactions AS r ON p.id = r.Posts_id
                    JOIN categories AS c ON p.Categories_id = c.id
                    JOIN users AS u ON p.Users_id = u.id
                    WHERE p.id = ?
                    GROUP BY p.id `;

    const commentsSql =
        "SELECT users.id as user_id, users.firstName, users.lastName, users.photo_url, comments.id, comments.comment_date, comments.message FROM comments INNER JOIN users ON comments.Users_id = users.id WHERE Posts_id = ?";
    db.query(`${postSql}; ${commentsSql}`, [user.id, postId, postId], (error, result, fields) => {
        if (error) throw error;

        // "results" is an array with one element for every statement in the query:
        let results = [
            {
                ...result[0][0],
                commentsCounter: result[1].length,
            },
            {
                comments: [...result[1]],
            },
        ];
        res.status(200).json(results);
    });
};

// POST Reactions to posts Controller
//==========================================================================================================
exports.postReaction = (req, res, next) => {
    const user = decodeUid(req.headers.authorization);
    const { reaction, post_id, reactionStatus } = req.body;

    //agregar una variable que recibe el estado actual desde el frontend ej.
    //reactionSatus = true (nuevo) /  false (actualizar)

    switch (reaction) {
        case 1: // Like Post
            try {
                if (reactionStatus) {
                    //TODO FALTA POR CREAR
                    const string = "INSERT INTO reactions (Posts_id, Users_id, reaction) VALUES (?, ?, 'like')";
                } else {
                    const string = "UPDATE reactions reaction = 'like' WHERE Posts_id = ? AND Users_id = ?";
                }
                const inserts = [post_id, user.id];
                const sql = mysql.format(string, inserts);

                const likePost = db.query(sql, (error, result) => {
                    if (error) throw error;
                    res.status(200).json({ message: "like post successfully!" });
                });
            } catch (err) {
                return new Error(err);
            }

            break;
        case -1: // Dislike Post
            try {
                if (reactionStatus) {
                    const string = "INSERT INTO reactions (Posts_id, Users_id, reaction) VALUES (?, ?, 'dislike')";
                } else {
                    const string = "UPDATE reactions reaction = 'dislike' WHERE Posts_id = ? AND Users_id = ?";
                }
                const inserts = [post_id, user.id];
                const sql = mysql.format(string, inserts);

                const dislikePost = db.query(sql, (error, result) => {
                    if (error) throw error;
                    res.status(200).json({ message: "dislike post successfully!" });
                });
            } catch (err) {
                return new Error(err);
            }
            break;
        case 0: // Like ou Dislike Post
            try {
                const string = "DELETE FROM reactions WHERE Posts_id = ? and Users_id = ?";
                const inserts = [post_id, user.id];
                const sql = mysql.format(string, inserts);

                const deleteLike = db.query(sql, (error, result) => {
                    if (error) throw error;
                    res.status(200).json({ message: "post reaction deleted successfully!" });
                });
            } catch (err) {
                return new Error(err);
            }
            break;
    }
};

// DELETE Posts Controller
//==========================================================================================================
exports.deletePost = (req, res, next) => {
    const user = decodeUid(req.headers.authorization);
    //si el user.id es el que hizo el post o si el otro suario tiene los derechos
    // console.log("Delete post");
    // console.log("req =>", "postId =>", req.params.id, "user =>", user.id, "image url =>", req.body.image_url);

    let string = "";
    let inserts = [];
    const imagePath = `/images/${req.body.image_url.split("/")[4]}`;

    console.log("image path =>", imagePath);

    if (user.clearance === "admin") {
        string = "DELETE FROM posts WHERE id = ?";
        inserts = [req.params.id];
        console.log("admin");
    } else {
        string = "DELETE FROM posts WHERE id = ? AND Users_id = ?";
        inserts = [req.params.id, user.id];
        console.log("user");
    }

    const sql = mysql.format(string, inserts);

    const deletePost = db.query(sql, (error, result) => {
        if (error) throw error;

        fs.unlink(imagePath, (err) => {
            console.log(err);
        });

        res.status(200).json({ message: "Post deleted successfully!" });
    });
};

// DELETE Comment Controller
//==========================================================================================================
exports.deleteComment = (req, res, next) => {
    const user = decodeUid(req.headers.authorization);
    console.log("Delete comment");
    console.log("req =>", "postId =>", req.params.id, "user =>", user.id);

    let string = "";
    let inserts = [];

    if (user.clearance === "admin") {
        string = "DELETE FROM comments WHERE id = ?";
        inserts = [req.params.id];
        console.log("admin");
    } else {
        string = "DELETE FROM comments WHERE id = ? AND Users_id = ?";
        inserts = [req.params.id, user.id];
        console.log("user");
    }

    const sql = mysql.format(string, inserts);

    const deleteComment = db.query(sql, (error, result) => {
        if (error) throw error;
        res.status(200).json({ message: "Comment deleted successfully!" });
    });
};
