const express = require("express");
const bodyParser = require("body-parser");

const placesRoutes = require("./Routes/PlacesRoutes.jsx");

const app = express();

app.use(placesRoutes);

app.listen(5000);