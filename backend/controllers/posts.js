"use strict";

// Database Route
const db = require("../config/db");
const mysql = require("mysql");

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
    let user_id = 1;
    const sql =
        "SELECT posts.id, users.id AS user_id, users.firstName, users.lastName, users.photo_url, posts.post_date, categories.category, posts.title, posts.image_url, posts.likes, posts.dislikes, posts.comments FROM posts INNER JOIN users ON posts.Users_id = users.id INNER JOIN categories ON posts.Categories_id = categories.id ORDER BY post_date DESC LIMIT 10";

    const getPosts = db.query(sql, (error, posts) => {
        if (error) throw error;
        let postsIdList = [];

        // loop para empujar en el arreglo los id's de los posts
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
                    // recorre todo el array de reacciones y deja de iterar cuando encuentra un like/dislike o con un "return true".
                    if (like.Posts_id === post.id) {
                        post.reaction = like.reaction;
                        return true;
                    } else {
                        //si no hay like, asignar el valor null
                        post.reaction = null;
                    }
                });
            });

            res.status(200).json(posts);
        });
    });
};

// GET Most Liked Posts Controller
exports.getMostLikedPosts = (req, res, next) => {
    let user_id = 1; // cambiar con el frontend
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
    let id = req.params.id;
    let user_id = 2;
    const postSql =
        "SELECT posts.id, users.id AS user_id, users.firstName, users.lastName, users.photo_url, posts.post_date, categories.category, posts.title, posts.image_url, posts.likes, posts.dislikes, posts.comments FROM posts INNER JOIN users ON posts.Users_id = users.id INNER JOIN categories ON posts.Categories_id = categories.id WHERE posts.id = ?";
    const reactionsSql = "SELECT reaction FROM reactions WHERE Users_id = ? AND Posts_id = ?";
    const commentsSql =
        "SELECT users.id, users.firstName, users.lastName, users.photo_url, comments.comment_date, comments.message FROM comments INNER JOIN users ON comments.Users_id = users.id WHERE Posts_id = ?";
    db.query(`${postSql}; ${reactionsSql}; ${commentsSql}`, [id, user_id, id, id], (error, result, fields) => {
        if (error) throw error;
        // "results" is an array with one element for every statement in the query:
        let results = {
            ...result[0][0],
            ...result[1][0],
            comments: { ...result[2] },
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
