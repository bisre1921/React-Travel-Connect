const express = require('express');

const PlacesControllers = require("../Controllers/PlacesControllers.jsx");
const router = express.Router();

router.get('/:pid', PlacesControllers.getPlaceById);

router.get("/user/:uid" , PlacesControllers.getPlacesByUserId); 

router.post("/" , PlacesControllers.createPlace);

router.patch("/:pid" , PlacesControllers.updatePlace);

router.delete("/:pid" , PlacesControllers.deletePlace);

module.exports = router;