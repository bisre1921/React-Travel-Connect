const express = require('express');
const {check} = require("express-validator");

const UsersControllers = require("../Controllers/UsersControllers.jsx");

const router = express.Router();

router.get('/', UsersControllers.getUsers);

router.post(
        "/signup" , 
        [
            check("name").not().isEmpty() , 
            check("email").normalizeEmail().isEmail() , 
            check("password").isLength({min : 6})
        ] ,
        UsersControllers.signup
    );

router.post("/login" , UsersControllers.login);

module.exports = router;
