const User = require("../models/User");

const getAllUsers = (req, res) => {
  User.getAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }

    res.json(results);
  });
};

module.exports = {
  getAllUsers,
};
