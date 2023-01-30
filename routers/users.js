const userController = require("../controllers/users");
const express = require("express");
const router = express.Router();

router.get("/", userController.getAllUsers);
router.post("/create-user", userController.createUser, userController.login);
router.post("/login", userController.login);

module.exports = router;
