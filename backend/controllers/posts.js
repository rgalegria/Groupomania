"use strict";

// Middleware Imports
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const fs = require("fs");

// Error Class
const HttpError = require("../models/http-error");

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

    // Vérification s'il y a une image dans le body
    if (req.body.image === "null") {
        return next(new HttpError("Veuillez choisir une image", 400));
    }

    // Requête
    const string = "INSERT INTO posts (Users_id, Categories_id, title, image_url) VALUES (?, ?, ?, ? )";
    const inserts = [user.id, category, title, imageUrl];
    const sql = mysql.format(string, inserts);

    const createPost = db.query(sql, (error, post) => {
        if (!error) {
            res.status(201).json({ message: "Publication sauvegardée" });
        } else {
            return next(new HttpError("Erreur de requête, la publication n'a pas été créée", 500));
        }
    });
};

// POST Create Comment Controller
//==========================================================================================================
exports.postComment = (req, res, next) => {
    const user = decodeUid(req.headers.authorization);
    const { postId, message } = req.body;

    // Requête
    const string = "INSERT INTO comments (Users_id, Posts_id, message) VALUES (?, ?, ?)";
    const inserts = [user.id, postId, message];
    const sql = mysql.format(string, inserts);

    const createComment = db.query(sql, (error, commentId) => {
        if (!error) {
            const string = `SELECT 
                                users.firstName, 
                                users.lastName, 
                                users.photo_url, 
                                comments.Posts_id AS id, 
                                comments.Users_id AS user_id,  
                                comments.message, 
                                comments.comment_date 
                            FROM comments INNER JOIN posts ON comments.posts_id = posts.id  
                            INNER JOIN users ON comments.Users_id = users.id 
                            WHERE comments.id = ?`;

            const inserts = [commentId.insertId];
            const sql = mysql.format(string, inserts);

            // Requête
            const returnComment = db.query(sql, (error, response) => {
                if (!error) {
                    res.status(201).json(response);
                } else {
                    return next(new HttpError("Erreur de requête, le commentaire n'a pas été créé", 500));
                }
            });
        } else {
            return next(new HttpError("Erreur de requête, le commentaire n'a pas été créé", 500));
        }
    });
};

// GET Post Categories Controller
//==========================================================================================================
exports.getCategories = (req, res, next) => {
    const sql = "SELECT * FROM categories";

    // Requête
    const query = db.query(sql, (error, results) => {
        if (!error) {
            res.status(200).json(results);
        } else {
            return next(new HttpError("Erreur de requête, les catégories n'ont pas pu être récupérées", 500));
        }
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
                const string = `SELECT
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
                                    (SELECT reaction FROM reactions WHERE Users_id = ? AND  Posts_id = r.Posts_id) AS userReaction
                                FROM posts AS p
                                LEFT JOIN reactions AS r ON p.id = r.Posts_id
                                JOIN categories AS c ON p.Categories_id = c.id
                                JOIN users AS u ON p.Users_id = u.id
                                GROUP BY p.id ORDER BY post_date DESC`;
                const inserts = [user.id];
                const sql = mysql.format(string, inserts);

                // Requête
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

                // Requête
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
            // Résultat des posts
            let finalPost = await getPosts();
            // Pour chaque post, vérifier commentaires et ajoutez-les
            for (let i = 0; i < finalPost.length; i++) {
                // Résultat des commentaires
                const comments = await getCommentCount(finalPost[i].post_id);
                finalPost[i].comments = comments;
            }
            return finalPost;
        } catch (err) {
            return new Error(err);
        }
    };

    composePost()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            return next(new HttpError("Erreur de requête, les publications n'ont pas pu être récupérées", 500));
        });
};

// GET Most Liked Posts Controller
//==========================================================================================================
exports.getMostLikedPosts = (req, res, next) => {
    const user = decodeUid(req.headers.authorization);

    // Fetch les posts avec plus likes
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
                                        (SELECT reaction FROM reactions WHERE Users_id = ? AND Posts_id = r.Posts_id) AS userReaction
                                    FROM posts AS p
                                    LEFT JOIN reactions AS r ON p.id = r.Posts_id
                                    JOIN categories AS c ON p.Categories_id = c.id
                                    JOIN users AS u ON p.Users_id = u.id
                                    GROUP BY p.id ORDER BY likes DESC`;
                const inserts = [user.id];
                const sql = mysql.format(sqlString, inserts);

                // Requête
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

                // Requête
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
            // Résultat des posts
            let finalPost = await getMostLiked();
            // Pour chaque post, vérifier commentaires et ajoutez-les
            for (let i = 0; i < finalPost.length; i++) {
                // Résultat des commentaires
                const comments = await getCommentCount(finalPost[i].post_id);
                finalPost[i].comments = comments;
            }
            return finalPost;
        } catch (err) {
            return new Error(err);
        }
    };

    composePost()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            return next(new HttpError("Erreur de requête, les publications n'ont pas pu être récupérées", 500));
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

    const commentsSql = `SELECT 
                            users.id AS user_id, 
                            users.firstName, 
                            users.lastName, 
                            users.photo_url, 
                            comments.id, 
                            comments.comment_date, 
                            comments.message 
                        FROM comments 
                        INNER JOIN users ON comments.Users_id = users.id 
                        WHERE Posts_id = ?`;
    db.query(`${postSql}; ${commentsSql}`, [user.id, postId, postId], (error, result, fields) => {
        if (!error) {
            // "results" c'est un tableau avec un élément de post et un èlèment avec les commentaires
            let results = [
                {
                    // copier le résultat de la première requête (le post)
                    ...result[0][0],

                    // Ajoute le compte des commmentaires
                    commentsCounter: result[1].length,
                },
                {
                    // Ajoute les commmentaires de la deuxième requête (les commentaires)
                    comments: [...result[1]],
                },
            ];
            res.status(200).json(results);
        } else {
            return next(new HttpError("Erreur de requête, la publication n'a pas pu être récuperée", 500));
        }
    });
};

// POST Reactions to posts Controller
//==========================================================================================================
exports.postReaction = (req, res, next) => {
    const user = decodeUid(req.headers.authorization);
    const { reaction, post_id, reacted } = req.body;

    console.log("frontend info =>", req.body);

    switch (reaction) {
        case "like": // Like Post
            try {
                let string;
                if (!reacted) {
                    string = "INSERT INTO reactions (Posts_id, Users_id, reaction) VALUES (?, ?, 'like')";
                } else {
                    string = "UPDATE reactions SET reaction = 'like' WHERE Posts_id = ? AND Users_id = ?";
                }
                const inserts = [post_id, user.id];
                const sql = mysql.format(string, inserts);

                const likePost = db.query(sql, (error, result) => {
                    if (error) throw error;
                    res.status(200).json({ message: "like post successfully!" });
                });
            } catch (err) {
                return next(
                    new HttpError("Erreur de requête, votre reaction à la publication n'a pas pu être enregistré", 500)
                );
            }

            break;
        case "dislike": // Dislike Post
            try {
                let string;
                if (!reacted) {
                    string = "INSERT INTO reactions (Posts_id, Users_id, reaction) VALUES (?, ?, 'dislike')";
                } else {
                    string = "UPDATE reactions SET reaction = 'dislike' WHERE Posts_id = ? AND Users_id = ?";
                }
                const inserts = [post_id, user.id];
                const sql = mysql.format(string, inserts);

                const dislikePost = db.query(sql, (error, result) => {
                    if (error) throw error;
                    res.status(200).json({ message: "dislike post successfully!" });
                });
            } catch (err) {
                return next(
                    new HttpError("Erreur de requête, votre reaction à la publication n'a pas pu être enregistré", 500)
                );
            }
            break;
        case "null": // Like ou Dislike Post
            try {
                const string = "UPDATE reactions SET reaction = 'null' WHERE Posts_id = ? AND Users_id = ?";
                // const string = "DELETE FROM reactions WHERE Posts_id = ? and Users_id = ?";
                const inserts = [post_id, user.id];
                const sql = mysql.format(string, inserts);

                const updateReaction = db.query(sql, (error, result) => {
                    if (error) throw error;
                    res.status(200).json({ message: "post reaction nulled successfully!" });
                });
            } catch (err) {
                return next(
                    new HttpError("Erreur de requête, votre reaction à la publication n'a pas pu être enregistré", 500)
                );
            }
            break;
    }
};

// DELETE Posts Controller
//==========================================================================================================
exports.deletePost = (req, res, next) => {
    const user = decodeUid(req.headers.authorization);

    let string = "";
    let inserts = [];
    const imagePath = `/images/${req.body.image_url.split("/")[4]}`;

    // Vérification si c'est l'admin ou l'utilisateur même
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

    // Requête
    const deletePost = db.query(sql, (error, result) => {
        if (!error) {
            // Supprimer l'image dans le serveur
            fs.unlink(imagePath, (err) => {
                console.log(err);
            });
            res.status(200).json({ message: "Post deleted successfully!" });
        } else {
            return next(new HttpError("Erreur de requête, la publication n'a pas pu être supprimée", 500));
        }
    });
};

// DELETE Comment Controller
//==========================================================================================================
exports.deleteComment = (req, res, next) => {
    const user = decodeUid(req.headers.authorization);

    let string = "";
    let inserts = [];

    // Vérification si c'est l'admin ou l'utilisateur même
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

    // Requête
    const deleteComment = db.query(sql, (error, result) => {
        if (!error) {
            res.status(200).json({ message: "Comment deleted successfully!" });
        } else {
            return next(new HttpError("Erreur de requête, le commentaire n'a pas pu être supprimé", 500));
        }
    });
};
