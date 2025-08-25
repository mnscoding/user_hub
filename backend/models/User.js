const db = require("../config/database");

const User = {
  create: (userData, callback) => {
    const { name, email, password, gender, hobby, skill_level, short_bio } =
      userData;
    const query =
      "INSERT INTO users (name, email, password, gender, hobby, skill_level, short_bio) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.execute(
      query,
      [name, email, password, gender, hobby, skill_level, short_bio],
      callback
    );
  },

  findByEmail: (email, callback) => {
    const query = "SELECT * FROM users WHERE email = ?";
    db.execute(query, [email], callback);
  },

  getAll: (callback) => {
    const query =
      "SELECT id, name, email, gender, hobby, skill_level, short_bio, created_at FROM users";
    db.execute(query, callback);
  },
};

module.exports = User;
