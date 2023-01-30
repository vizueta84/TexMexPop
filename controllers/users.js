const instance = require("../util/connection");

const argon2 = require("argon2");

const jwt = require("jsonwebtoken");

const getAllUsers = (req, res) => {
  const sql = "SELECT * FROM users";

  instance.query(sql, (err, results) => {
    if (err) {
      return res.json({ error: err });
    }
    res.json(results);
  });
};

const createUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  const sql = `
    INSERT INTO users (username, email, password)
    VALUES (?, ?, ?)
  `;

  if (password) {
    try {
      const hash = await argon2.hash(password);
      console.log(hash, "the hash");
      const params = [username, email, hash];
      instance.query(sql, params, (err, results) => {
        if (err) {
          return res.status(400).json({ err, msg: "Something went wrong" });
        }
       next();
      });
    } catch (error) {
      return res.json(error);
    }
  } else {
    res.status(400).json({ msg: "No password provided" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const sql = `
    SELECT * FROM users WHERE username = ?;
  `;

  instance.query(sql, [username], async (err, results) => {
    console.log(results[0]);
    if (err) {
      return res.status(400).json({ err, msg: "Something went wrong" });
    }
    try {
      const match = await argon2.verify(results[0].password, password);
      console.log(match, "the hash");
      if (match) {
        const data = {
          user_id: results[0].id,
          username: results[0].username,
        };
        const token = jwt.sign(data, process.env.SUPER_SECRET);
        console.log(token);
        return res.json({ token: token });
      }
    } catch (error) {
      return res.json({ error: "Something went wrong" });
    }
  });
};

module.exports = { getAllUsers, createUser, login };
