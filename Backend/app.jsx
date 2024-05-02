const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
 
const placesRoutes = require("./Routes/PlacesRoutes.jsx");
const usersRoutes = require("./Routes/UsersRoutes.jsx");
const HttpError = require("./Models/HttpError.jsx");

const app = express();

app.use(bodyParser.json()); 

app.use("/uploads/images" , express.static(path.join("uploads" , "images")));

app.use((req , res , next) => {
    res.setHeader("Access-Control-Allow-Origin" , "*");
    res.setHeader("Access-Control-Allow-Headers" , "Origin , X-Requested-With , Content-Type , Accept , Authorization");
    res.setHeader("Access-Control-Allow-Methods" , "GET , POST , PATCH , DELETE");
    next();
});

app.use("/api/places" , placesRoutes);
app.use("/api/users" , usersRoutes);

app.use((req , res , next) => {
    const error = new HttpError("Could not find this page" , 404);
    throw error;
})

app.use((error , req , res , next) => {
    if (req.file) {
        fs.unlink(req.file.path, err => {
          console.log(err);
        });
    }
    if(res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message : error.message || "An unknown error occurred" });
});

mongoose
    .connect("mongodb+srv://bisrat:bisrat1234@cluster0.s8olojo.mongodb.net/mern?retryWrites=true&w=majority&appName=Cluster0")
    .then( () => {
        app.listen(5000);
    })
    .catch(error => {
        console.log(error);
    });

