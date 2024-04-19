const { v4: uuidv4 } = require('uuid');
const HttpError = require("../Models/HttpError.jsx");
const {validationResult} = require("express-validator");

const dummyUsers = [
    {
        id : "u1" , 
        name : "john davies" , 
        email : "john@gmail.com" , 
        password : "john1234" ,
    }
]

const getUsers = (req, res , next) => {
    res.json({users : dummyUsers});
};

const signup = (req, res , next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        throw new HttpError("Invalid inputs passed , please check your data" , 422);
    };

    const {name , email , password} = req.body;

    const hasUser = dummyUsers.find(u => u.email === email);
    if(hasUser) {
        throw new HttpError("Could not create user , email already exists" , 422);
    }
    const createdUser = {
        id : uuidv4() ,  
        name , 
        email , 
        password , 
    };

    dummyUsers.push(createdUser);
    res.status(201).json({user : createdUser});
};

const login = (req, res , next) => {
    const {email , password} = req.body;

    const identifiedUser = dummyUsers.find(u => u.email === email);
    if(!identifiedUser || identifiedUser.password !== password) {
        throw new HttpError("Could not identify user , credentials seem to be wrong" , 401);
    }
    res.json({message : "Logged in"});
};


exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;