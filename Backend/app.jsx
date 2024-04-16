const express = require("express");
const bodyParser = require("body-parser");
 
const placesRoutes = require("./Routes/PlacesRoutes.jsx");

const app = express();

app.use("/api/places" , placesRoutes);

app.listen(5000);