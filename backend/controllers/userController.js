const User = require("../models/User");

const getAllUsers = (req, res) => {
  User.getAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
};

const getUserById = (req, res) => {
  const userId = req.params.id;

  User.getById(userId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    if (!result) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(result);
  });
};

const updateUser = (req, res) => {
  const userId = req.params.id;

  if (req.user.id.toString() !== userId.toString()) {
    return res
      .status(403)
      .json({ error: "You can only update your own profile" });
  }

  const updatedData = req.body;

  User.update(userId, updatedData, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "User updated successfully" });
  });
};

const deleteUser = (req, res) => {
  const userId = req.params.id;

  if (req.user.id.toString() !== userId.toString()) {
    return res
      .status(403)
      .json({ error: "You can only delete your own profile" });
  }

  User.delete(userId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "User deleted successfully" });
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
