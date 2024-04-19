const express = require('express');

const UsersControllers = require("../Controllers/UsersControllers.jsx");

const router = express.Router();

router.get('/', UsersControllers.getUsers);

router.post("/signup" , UsersControllers.signup);

router.post("/login" , UsersControllers.login);

module.exports = router;
