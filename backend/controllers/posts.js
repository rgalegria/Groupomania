"use strict";

// Middleware Imports

const db = require("../db");
const post = require("../models/posts");
const { json } = require("express");

// POST Create Posts Controller

exports.createPost = (req, res, next) => {
  let values = [
    req.body.Users_id,
    req.body.Categories_id,
    req.body.title,
    req.body.image_url,
  ];
  const sql =
    "INSERT INTO posts (Users_id, Categories_id, title, image_url) VALUES (?)";
  const query = db.query(sql, [values], (error, post) => {
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
    "SELECT posts.id ,users.firstName, users.lastName, posts.post_date, categories.category, posts.title, posts.image_url, posts.likes, posts.dislikes, posts.comments FROM posts INNER JOIN users ON posts.Users_id = users.id INNER JOIN categories ON posts.Categories_id = categories.id ORDER BY post_date DESC LIMIT 10";
  const query = db.query(sql, (error, posts) => {
    if (error) throw error;
    let postsIdList = [];
    // loop para empujar en el arreglo los id's de los posts
    posts.forEach((post) => {
      postsIdList.push(post.id);
    });
    postsIdList = postsIdList.join();

    console.log("type of data inside :", typeof postsIdList[5]);

    const sql2 = `SELECT * FROM reactions WHERE Posts_id IN (${postsIdList}) AND Users_id = ${user_id}`;
    // const sql2 = "SELECT * FROM reactions WHERE Posts_id IN (14,12,5,4,3,2,1,3) AND Users_id = 1";
    // const sql2 = "SELECT * FROM reactions WHERE Posts_id IN (?) AND Users_id = ? ";
    const query2 = db.query(sql2, (error, likes) => {
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
  let user_id = 1;
  const sql =
    "SELECT posts.id ,users.firstName, users.lastName, posts.post_date, categories.category, posts.title, posts.image_url, posts.likes, posts.dislikes, posts.comments FROM posts INNER JOIN users ON posts.Users_id = users.id INNER JOIN categories ON posts.Categories_id = categories.id ORDER BY post_date DESC LIMIT 10";
  const query = db.query(sql, (error, posts) => {
    if (error) throw error;
    let postsList = [];
    posts.forEach((post) => {
      postsList.push(post.id);
    });
    postsList = postsList.join();
    const sql2 = `SELECT * FROM reactions WHERE Posts_id IN (${postsList}) AND Users_id = ${user_id}`;
    const query2 = db.query(sql2, (error, likes) => {
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

//  const sql =
//    "SELECT posts.id, users.firstName, users.lastName, posts.post_date, categories.category, posts.title, posts.image_url, posts.likes,posts.dislikes, posts.comments FROM posts INNER JOIN users ON posts.Users_id = users.id INNER JOIN categories ON posts.Categories_id = categories.id WHERE posts.id = ?";

exports.getOnePost = (req, res, next) => {
  let id = req.params.id;
  let user_id = 2;
  const sql = `SELECT posts.id ,users.firstName, users.lastName, posts.post_date, categories.category, posts.title, posts.image_url, posts.likes, posts.dislikes, posts.comments 
                 FROM posts 
                 INNER JOIN users ON posts.Users_id = users.id 
                 INNER JOIN categories ON posts.Categories_id = categories.id 
                 WHERE posts.id = ${id}`;
  const secondSql = `SELECT reaction
                 FROM reactions
                 WHERE Users_id = ${user_id} AND Posts_id = ${id}`;
  const thirdSql = `SELECT users.id, users.firstName, users.lastName, users.photo_url, comments.comment_date, comments.message
                   FROM comments
                   INNER JOIN users ON comments.Users_id = users.id
                   WHERE Posts_id = ${id}`;
  db.query(`${sql}; ${secondSql}; ${thirdSql}`, (error, result, fields) => {
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

// PUT Title Update in Posts Controller

exports.modifyPost = (req, res, next) => {
  const sql = "UPDATE posts SET title = ? WHERE id = ?";
  const query = db.query(sql, [req.body.title, req.body.id], (error, title) => {
    if (error) throw error;
    res.status(200).json({ message: "Title Updated successfully!" });
  });
};

// DELETE soft Posts Controller

// exports.deletePost = (req, res, next) => {
//   console.log("id:", req.params.id);
//   let id = req.params.id;
//   const sql = `DELETE FROM posts WHERE id = ${id}`;
//   const query = db.query(sql, (error, result) => {
//     if (error) throw error;
//     res.status(200).json({ message: "Post deleted successfully!" });
//   });
// };

// DELETE Hard Posts Controller

exports.deletePost = (req, res, next) => {
  const sql = "DELETE FROM posts WHERE id = ?";
  const query = db.query(sql, [req.params.id], (error, result) => {
    if (error) throw error;
    res.status(200).json({ message: "Post deleted successfully!" });
  });
};
