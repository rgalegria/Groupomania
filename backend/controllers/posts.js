"use strict";

// Middleware Imports
const jwt = require("jsonwebtoken");
const mysql = require("mysql");

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
    const imageUrl = `${req.protocol}://${req.get("host")}/images/posts/${req.file.filename}`;

    const string = "INSERT INTO posts (Users_id, Categories_id, title, image_url) VALUES (?, ?, ?, ? )";
    const inserts = [user.id, req.body.Categories_id, req.body.title, imageUrl];
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

    const string = "INSERT INTO comments (Users_id, Posts_id, message) VALUES (?, ?, ?)";
    const inserts = [user.id, req.params.id, req.body.message];
    const sql = mysql.format(string, inserts);

    const createComment = db.query(sql, (error, post) => {
        if (!error) {
            res.status(201).json({ message: "Comment Posted successfully!" });
        } else {
            res.status(400).json({ error });
        }
    });
};

// GET All Posts Controller
//==========================================================================================================
// exports.getAllPosts = (req, res, next) => {
//     // Obtenir l'user ID
//     const user = decodeUid(req.headers.authorization);
//     console.log("Decoded Token Object =>", user.id, user.clearance);

//     // Fetch liste de 10 posts
//     const getPosts = () => {
//         return new Promise((resolve, reject) => {
//             try {
//                 const sqlString = `SELECT
//                                         p.*,
//                                         r.Posts_id,
//                                         COUNT(if(r.reaction = 'like', 1, NULL)) AS likes,
//                                         COUNT(if(r.reaction = 'dislike', 1, NULL)) AS dislikes,
//                                         (SELECT reaction FROM reactions WHERE Users_id = ? AND Posts_id = r.Posts_id) AS userReaccion
//                                     FROM
//                                         reactions AS r
//                                     JOIN
//                                         posts AS p ON p.id = r.Posts_id
//                                     GROUP BY r.Posts_id ORDER BY post_date DESC LIMIT 10`;
//                 const inserts = [user.id];
//                 const sql = mysql.format(sqlString, inserts);
//                 console.log("first query =>", sql);
//                 // MySQL DB Query
//                 const getPosts = db.query(sql, (error, posts) => {
//                     if (error) reject(error);
//                     resolve(posts);
//                 });
//             } catch (err) {
//                 reject(err);
//             }
//         });
//     };

//     // Fetch comments par post
//     const getCommentCount = (post_id) => {
//         return new Promise((resolve, reject) => {
//             try {
//                 const string = "SELECT COUNT(*) as comments FROM comments WHERE Posts_id = ?";
//                 const inserts = [post_id];
//                 const sql = mysql.format(string, inserts);

//                 // MySQL DB Query
//                 const commentCount = db.query(sql, (error, comments) => {
//                     if (error) reject(error);
//                     resolve(comments[0].comments);
//                 });
//             } catch (err) {
//                 reject(err);
//             }
//         });
//     };

//     // Fetch reaction par post
//     const composePost = async () => {
//         try {
//             //consultamos los posts
//             let finalPost = await getPosts();
//             for (let i = 0; i < finalPost.length; i++) {
//                 //consultamos los comentarios
//                 const comments = await getCommentCount(finalPost[i].id);
//                 finalPost[i].comments = comments;
//             }

//             return finalPost;
//         } catch (err) {
//             // console.log("error de finalPost:", err.stack);
//             return new Error(err);
//         }
//     };

//     composePost()
//         .then((result) => {
//             //console.log("error:", result);
//             res.status(200).json(result);
//         })
//         .catch((error) => {
//             res.status(400).json(error);
//         });
// };

// GET All Posts Controller
exports.getAllPosts = (req, res, next) => {
    // Obtenir l'user ID
    const user_id = decodeUid(req.headers.authorization);

    // Fetch liste de 10 posts
    const getPosts = () => {
        return new Promise((resolve, reject) => {
            const sql =
                "SELECT posts.id, users.id AS user_id, users.firstName, users.lastName, users.photo_url, posts.post_date, categories.category, posts.title, posts.image_url FROM posts INNER JOIN users ON posts.Users_id = users.id INNER JOIN categories ON posts.Categories_id = categories.id ORDER BY post_date DESC LIMIT 10";

            // MySQL DB Query
            const getPosts = db.query(sql, (error, posts) => {
                if (error) reject(error);
                resolve(posts);
            });
        });
    };

    // Fetch reaction par post
    const getReactionsByPost = (post_id) => {
        return new Promise((resolve, reject) => {
            const string = "SELECT * FROM reactions WHERE Posts_id IN (?)";
            const inserts = [post_id];
            const reactionsSql = mysql.format(string, inserts);

            // MySQL DB Query
            const reactionsByPost = db.query(reactionsSql, (error, reactions) => {
                if (error) reject(error);
                resolve(reactions);
            });
        });
    };

    // Fetch comments par post
    const getCommentsByPost = (post_id) => {
        return new Promise((resolve, reject) => {
            const string = "SELECT * FROM comments WHERE Posts_id IN (?)";
            const inserts = [post_id];
            const reactionsSql = mysql.format(string, inserts);

            // MySQL DB Query
            const commentsByPost = db.query(reactionsSql, (error, reactions) => {
                if (error) reject(error);
                resolve(reactions);
            });
        });
    };

    // Fetch de la reaction de l'utilisateur par post
    const countReactions = (reactions) => {
        return new Promise((resolve, reject) => {
            try {
                let likes = 0,
                    dislikes = 0,
                    userReaction = null;
                reactions.forEach((userReaction) => {
                    //es like?
                    if (userReaction.reaction == "like") {
                        likes += 1;
                    } else {
                        dislikes += 1;
                    }
                    //es la reaccion del usuario?
                    if (userReaction.Users_id == user_id) {
                        userReaction = userReaction.reaction;
                    }
                });
                resolve({
                    likes: likes,
                    dislikes: dislikes,
                    reaction: userReaction,
                });
            } catch (err) {
                console.log("counterReactions error ", err);
                reject(err);
            }
        });
    };

    // Fetch de la reaction de l'utilisateur par post
    const countComments = (comments) => {
        return new Promise((resolve, reject) => {
            try {
                let comments = 0;
                comments.forEach((userReaction) => {
                    //es like?
                    if (userReaction.reaction == "like") {
                        likes += 1;
                    } else {
                        dislikes += 1;
                    }
                    //es la reaccion del usuario?
                    if (userReaction.Users_id == user_id) {
                        userReaction = userReaction.reaction;
                    }
                });
                resolve({
                    likes: likes,
                    dislikes: dislikes,
                    reaction: userReaction,
                });
            } catch (err) {
                console.log("counterReactions error ", err);
                reject(err);
            }
        });
    };

    // Fetch reaction par post
    const doWork = async () => {
        try {
            //consultamos los posts
            let finalPost = await getPosts();
            for (let i = 0; i < finalPost.length; i++) {
                //pasamos el post id y consultamos las reacciones
                const reactions = await getReactionsByPost(finalPost[i].id);
                //sacamos el conteo de reacciones
                const countReactions2 = await countReactions(reactions);
                finalPost[i].likes = countReactions2.likes;
                finalPost[i].dislikes = countReactions2.dislikes;
                finalPost[i].reaction = countReactions2.reaction;
            }
            return finalPost;
        } catch (err) {
            // console.log("error de finalPost:", err.stack);
            return new Error(err);
        }
    };

    doWork()
        .then((result) => {
            // console.log("error:", result);
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
                                    p.*,
                                    r.Posts_id,
                                    COUNT(if(r.reaction = 'like', 1, NULL)) AS likes,
                                    COUNT(if(r.reaction = 'dislike', 1, NULL)) AS dislikes,
                                    (SELECT reaction FROM reactions WHERE Users_id = ? AND Posts_id = r.Posts_id) AS userReaccion
                                FROM
                                    reactions AS r
                                JOIN 
                                    posts AS p ON p.id = r.Posts_id
                                GROUP BY r.Posts_id ORDER BY likes DESC LIMIT 10`;
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
                const comments = await getCommentCount(finalPost[i].id);
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
    const postSql =
        "SELECT posts.id, users.id AS user_id, users.firstName, users.lastName, users.photo_url, posts.post_date, categories.category, posts.title, posts.image_url FROM posts INNER JOIN users ON posts.Users_id = users.id INNER JOIN categories ON posts.Categories_id = categories.id WHERE posts.id = ?";

    const reactionsSql = "SELECT * FROM reactions WHERE Posts_id = ?";
    const commentsSql =
        "SELECT users.id, users.firstName, users.lastName, users.photo_url, comments.comment_date, comments.message FROM comments INNER JOIN users ON comments.Users_id = users.id WHERE Posts_id = ?";
    db.query(`${postSql}; ${reactionsSql}; ${commentsSql}`, [postId, postId, postId], (error, result, fields) => {
        if (error) throw error;

        let likes = 0,
            dislikes = 0,
            userReaction;

        //loop de las reacciones
        for (let i = 0; i < result[1].length; i++) {
            //es like?

            console.log("reaction =>", result[1][i]);
            if (result[1][i].reaction == "like") {
                likes += 1;
            } else {
                dislikes += 1;
            }

            //es la reaccion del user?
            if (result[1][i].Users_id == user.id) userReaction = result[1][i].reaction;
        }

        // "results" is an array with one element for every statement in the query:
        let results = {
            ...result[0][0],
            likes: likes,
            dislikes: dislikes,
            reaction: userReaction,
            commentsCounter: result[2].length,
            comments: [...result[2]],
        };
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

// DELETE Hard Posts Controller
//==========================================================================================================
exports.deletePost = (req, res, next) => {
    const user = decodeUid(req.headers.authorization);
    //si el user.id es el que hizo el post o si el otro suario tiene los derechos
    if (user.clearance === "admin") {
        const string = "DELETE FROM posts WHERE id = ?";
        const inserts = [req.body.post_id];
    } else {
        const string = "DELETE FROM posts WHERE id = ? AND Users_id = ?";
        const inserts = [req.body.post_id, user.id];
    }

    const sql = mysql.format(string, inserts);

    const deletePost = db.query(sql, (error, result) => {
        if (error) throw error;
        res.status(200).json({ message: "Post deleted successfully!" });
    });
};

// DELETE Hard Posts Controller
//==========================================================================================================
exports.deleteComment = (req, res, next) => {
    const user = decodeUid(req.headers.authorization);

    if (user.clearance === "admin") {
        const string = "DELETE FROM posts WHERE id = ?";
        const inserts = [req.body.post_id];
    } else {
        const string = "DELETE FROM posts WHERE id = ? AND Users_id = ?";
        const inserts = [req.body.post_id, user.id];
    }

    const sql = mysql.format(string, inserts);

    const deleteComment = db.query(sql, (error, result) => {
        if (error) throw error;
        res.status(200).json({ message: "Comment deleted successfully!" });
    });
};
