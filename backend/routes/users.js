const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../controllers/userController");
const auth = require("../middleware/auth");

router.get("/", auth, getAllUsers);

module.exports = router;
