const express = require("express");
const app = express.Router();
const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "darren",
  password: "@Lifechoices1234",
  database: "personal_blog",
});

// CREATE USERS
app.post("/", (req, res) => {
  const { name, email, contact, password } = req.body;
  if (!name || !email || !contact || !password)
    res.status(400).send({ msg: "Not all fields have been submitted" });

  con.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
    const sql = `INSERT INTO users (user_name, user_email, user_contact, user_password) VALUES ('${name}', '${email}', '${contact}', '${password}')`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });
});

// GET ALL USERS
app.get("/", (req, res) => {
  const sql = `SELECT * FROM users`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("All records retrieved");
    res.send(result);
  });
});

// GET ONE USER
app.get("/:id", (req, res) => {
  const sql = `SELECT * FROM users WHERE user_id=${req.params.id}`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record retreived");
    res.send(result);
  });
});

// SIGN/LOGIN IN USER
app.patch("/", (req, res) => {
  const { email, password } = req.body;
  const sql = `SELECT * FROM users WHERE user_email="${email}" AND user_password="${password}"`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record found");
    res.send(result);
  });
});

// UPDATE USER WITH ID
app.put("/:id", (req, res) => {
  const { name, email, contact, password, avatar, about } = req.body;

  let sql = ` UPDATE users SET `;

  if (name) {
    sql += ` user_name = '${name}',`;
  }
  if (email) {
    sql += ` user_email = '${email}',`;
  }
  if (contact) {
    sql += ` user_contact = '${contact}',`;
  }
  if (password) {
    sql += ` user_password = '${password}',`;
  }
  if (avatar) {
    sql += ` user_avatar = '${avatar}',`;
  }
  if (about) {
    sql += ` user_about = '${about}',`;
  }
  if (sql.endsWith(",")) sql = sql.substring(0, sql.length - 1);

  sql += ` WHERE user_id = ${req.params.id}`;

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("record(s) updated");
    res.send(result);
  });
});

// DELETE USER WITH ID
app.delete("/:id", (req, res) => {
  const sql = `DELETE FROM users WHERE user_id = ${req.params.id}`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record deleted");
    res.send(result);
  });
});

module.exports = app;
