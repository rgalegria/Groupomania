"use strict";

// Middleware Imports
const jwt = require("jsonwebtoken");

// Database Route
const db = require("../config/db");
const mysql = require("mysql");

// UserID decoder
const decodeUid = (authorization) => {
    const token = authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return decodedToken.userId;
};

// POST Create Posts Controller
exports.createPost = (req, res, next) => {
    const string = "INSERT INTO posts (Users_id, Categories_id, title, image_url) VALUES (?, ?, ?, ? )";
    const inserts = [req.body.Users_id, req.body.Categories_id, req.body.title, req.body.image_url];
    const sql = mysql.format(string, inserts);
    const createPost = db.query(sql, (error, post) => {
        if (!error) {
            res.status(201).json({ message: "Post saved successfully!" });
        } else {
            res.status(400).json({ error });
        }
    });
};

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
exports.getMostLikedPosts = (req, res, next) => {
    // let user_id = 1; // cambiar con el frontend
    const sql =
        "SELECT posts.id, users.id AS user_id, users.firstName, users.lastName, users.photo_url, posts.post_date, categories.category, posts.title, posts.image_url, posts.likes, posts.dislikes, posts.comments FROM posts INNER JOIN users ON posts.Users_id = users.id INNER JOIN categories ON posts.Categories_id = categories.id ORDER BY likes DESC LIMIT 10";

    const getPostsByLikes = db.query(sql, (error, posts) => {
        if (error) throw error;

        let postsIdList = [];
        posts.forEach((post) => {
            postsIdList.push(post.id);
        });

        const string = "SELECT * FROM reactions WHERE Posts_id IN (?) AND Users_id = ? ";
        const inserts = [postsIdList, user_id];
        const secondSql = mysql.format(string, inserts);

        const getLikes = db.query(secondSql, (error, likes) => {
            if (error) throw error;

            posts.forEach((post) => {
                likes.some((like) => {
                    if (like.Posts_id == post.id) {
                        post.reaction = like.reaction;
                        return true;
                    } else {
                        post.reaction = null;
                        console.log("sin reaccion");
                    }
                });
            });
            res.status(200).json(posts);
        });
    });
};

// GET One Posts Controller
exports.getOnePost = (req, res, next) => {
    //Obtenir ID avec JWT
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decodedToken.userId;
    let postId = req.params.id;
    const postSql =
        "SELECT posts.id, users.id AS user_id, users.firstName, users.lastName, users.photo_url, posts.post_date, categories.category, posts.title, posts.image_url, posts.comments FROM posts INNER JOIN users ON posts.Users_id = users.id INNER JOIN categories ON posts.Categories_id = categories.id WHERE posts.id = ?";
    //const reactionsSql = "SELECT reaction FROM reactions WHERE Users_id = ? AND Posts_id = ?";
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
            if (result[1][i].Users_id == user_id) userReaction = result[1][i].reaction;
        }
        //console.log("result", result, "userID:", user_id);
        // "results" is an array with one element for every statement in the query:
        let results = {
            ...result[0][0],
            //...result[1][0],
            likes: likes,
            dislikes: dislikes,
            reaction: userReaction,
            commentsCounter: result[2].length,
            comments: [...result[2]],
        };
        res.status(200).json(results);
    });
};

// PUT Post Title Update Controller

// exports.modifyPost = (req, res, next) => {
//   const sql = "UPDATE posts SET title = ? WHERE id = ?";
//   const updatePost = db.query(
//     sql,
//     [req.body.title, req.params.id],
//     (error, title) => {
//       if (error) throw error;
//       res.status(200).json({ message: "Title Updated successfully!" });
//     }
//   );
// };

// DELETE Hard Posts Controller

exports.deletePost = (req, res, next) => {
    //si el user_id es el que hizo el post o si el otro suario tiene los derechos
    const string = "DELETE FROM posts WHERE id = ?";
    const inserts = [req.params.id];
    const sql = mysql.format(string, inserts);

    const deletePost = db.query(sql, (error, result) => {
        if (error) throw error;
        res.status(200).json({ message: "Post deleted successfully!" });
    });
};

// DELETE Hard Posts Controller

exports.postReaction = (req, res, next) => {
    switch (req.body.like) {
        case 1: // Like Sauce
            Sauce.updateOne(
                { _id: req.params.id },
                {
                    $inc: { likes: 1 },
                    $push: { usersLiked: req.body.userId },
                    _id: req.params.id,
                }
            )
                .then(() => res.status(201).json({ message: "Sauce Liked Successfully!" }))
                .catch((error) => res.status(400).json({ error }));
            break;
        case -1: // Dislike Sauce
            Sauce.updateOne(
                { _id: req.params.id },
                {
                    $inc: { dislikes: 1 },
                    $push: { usersDisliked: req.body.userId },
                    _id: req.params.id,
                }
            )
                .then(() => res.status(201).json({ message: "Sauce Disliked Successfully!" }))
                .catch((error) => res.status(400).json({ error }));
            break;
        case 0: // Like ou Dislike Sauce
            Sauce.findOne({ _id: req.params.id })
                .then((sauce) => {
                    if (sauce.usersLiked.includes(req.body.userId) === true) {
                        Sauce.updateOne(
                            { _id: req.params.id },
                            { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } }
                        )
                            .then(() => res.status(200).json({ message: "Sauce UnLiked Successfully!" }))
                            .catch((error) => res.status(400).json({ error }));
                    } else {
                        Sauce.updateOne(
                            { _id: req.params.id },
                            {
                                $inc: { dislikes: -1 },
                                $pull: { usersDisliked: req.body.userId },
                            }
                        )
                            .then(() => res.status(200).json({ message: "Sauce Undisliked Successfully!" }))
                            .catch((error) => res.status(400).json({ error }));
                    }
                })
                .catch((error) => res.status(500).json({ error }));
            break;
    }
};
