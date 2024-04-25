const { v4: uuidv4 } = require('uuid');
const HttpError = require("../Models/HttpError.jsx");
const {validationResult} = require("express-validator");
const User = require("../models/user.jsx");

const dummyUsers = [
    {
        id : "u1" , 
        name : "john davies" , 
        email : "john@gmail.com" , 
        password : "john1234" ,
    }
]

const getUsers = async (req, res , next) => {
    let users;
    try {
        users = User.find({} , "-password");
    } catch (err) {
        const error = new HttpError("Fetching users failed, please try again later" , 500);
        return next(error);
    };
    

    res.json({users : users.map(user => user.toObject({getters : true}))});
};

const signup = async (req, res , next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return next (
            new HttpError("Invalid inputs passed , please check your data" , 422)
        ) 
    };
 
   const {name , email , password } = req.body;
    
   let existingUser;
   try {
    existingUser = await User.findOne({email : email})
   } catch (err) {
    const error = new HttpError("signing up failed, please try again later" , 500);
    return next(error);
   }

   if(existingUser) {
    const error = new HttpError("User exists already, please login instead" , 422);
    return next(error);
   }

    const createdUser = new User({
        name ,
        email, 
        image : "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/400px-Empire_State_Building_%28aerial_view%29.jpg" ,
        password , 
        places : []
    })

    try {
        await createdUser.save();
    } catch(err) {
        const error = new HttpError("Signing up failed, please try again" , 500);
        return next(error);
    };


    res.status(201).json({user : createdUser.toObject({getters : true})});
};

const login = async (req, res , next) => {
    const {email , password} = req.body;

    let existingUser;
    try {
     existingUser = await User.findOne({email : email})
    } catch (err) {
     const error = new HttpError("logging in failed, please try again later" , 500);
     return next(error);
    };

    if(!existingUser || existingUser.password !== password) {
        const error = new HttpError("Invalid credentials, Could not log you in" , 401);
    }
    
    res.json({message : "Logged in"});
};


exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;