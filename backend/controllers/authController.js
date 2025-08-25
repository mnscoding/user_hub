const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res) => {
  const { name, email, password, gender, hobby, skill_level, short_bio } =
    req.body;

  User.findByEmail(email, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length > 0) {
      return res.status(409).json({ error: "User already exists" });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ error: "Error hashing password" });
      }

      const newUser = {
        name,
        email,
        password: hashedPassword,
        gender,
        hobby,
        skill_level,
        short_bio,
      };

      User.create(newUser, (err, results) => {
        if (err) {
          return res.status(500).json({ error: "Error creating user" });
        }

        const token = jwt.sign(
          { id: results.insertId, email },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        res.status(201).json({
          message: "User created successfully",
          token,
          user: {
            id: results.insertId,
            name,
            email,
          },
        });
      });
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    });
  });
};

module.exports = {
  register,
  login,
};
