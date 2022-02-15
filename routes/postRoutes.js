const express = require("express");
const app = express.Router();
const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "darren",
  password: "@Lifechoices1234",
  database: "personal_blog",
});

// CREATE POSTS
app.post("/", (req, res) => {
  const { title, body, date, author } = req.body;
  if (!title || !body || !date || !author)
    res.status(400).send({ msg: "Not all fields have been submitted" });

  con.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
    const sql = `INSERT INTO posts (post_title, post_body, post_date, post_author) VALUES ('${title}', '${body}', '${date}', '${author}')`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });
});

// GET ALL POSTS
app.get("/", (req, res) => {
  const sql = `SELECT * FROM posts`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("All records retrieved");
    res.send(result);
  });
});

// GET ONE POST
app.get("/:id", (req, res) => {
  const sql = `SELECT * FROM posts WHERE user_id=${req.params.id}`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record retreived");
    res.send(result);
  });
});

// SIGN/LOGIN IN POST
app.patch("/", (req, res) => {
  const { body, author } = req.body;
  const sql = `SELECT * FROM posts WHERE post_body="${body}" AND post_author="${author}"`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record found");
    res.send(result);
  });
});

// UPDATE POST WITH ID
app.put("/:id", (req, res) => {
  const { title, body, date, author } = req.body;

  let sql = "UPDATE posts SET ";

  if (title) {
    sql += ` post_title = '${title}',`;
  }
  if (body) {
    sql += ` post_body = '${body}',`;
  }
  if (date) {
    sql += ` post_date = '${date}',`;
  }
  if (author) {
    sql += ` post_author = '${author}',`;
  }
  if (sql.endsWith(",")) sql = sql.substring(0, sql.length - 1);

  sql += ` WHERE post_id = ${req.params.id}`;

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("record(s) updated");
    res.send(result);
  });
});

// DELETE POST WITH ID
app.delete("/:id", (req, res) => {
  const sql = `DELETE FROM posts WHERE post_id = ${req.params.id}`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record deleted");
    res.send(result);
  });
});

module.exports = app;
