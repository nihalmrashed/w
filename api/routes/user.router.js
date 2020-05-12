const express = require("express");
const router = express.Router();
//const logger = require('../middleware/logger').logger;
const userController = require("../controllers/user.controller");

router.post("/login", userController.login);
router.post("/register", userController.register);
router.post('/password', userController.updatePassword);

module.exports = router;
