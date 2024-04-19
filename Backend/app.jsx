const express = require("express");
const bodyParser = require("body-parser");
 
const placesRoutes = require("./Routes/PlacesRoutes.jsx");
const usersRoutes = require("./Routes/UsersRoutes.jsx");
const HttpError = require("./Models/HttpError.jsx");

const app = express();

app.use(bodyParser.json()); 

app.use("/api/places" , placesRoutes);
app.use("/api/users" , usersRoutes);

app.use((req , res , next) => {
    const error = new HttpError("Could not find this page" , 404);
    throw error;
})

app.use((error , req , res , next) => {
    if(res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message : error.message || "An unknown error occurred" });
})

app.listen(5000);