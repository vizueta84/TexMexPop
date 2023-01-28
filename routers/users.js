const userController = require("../controllers/users");
const express = require("express");
const router = express.Router();

router.get("/", userController.getAllUsers);
router.post("/create-user", userController.createUser);
router.post("/login", userController.login);

module.exports = router;
