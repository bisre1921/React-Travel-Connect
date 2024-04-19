const express = require('express');
const { check } = require("express-validator");
 
const PlacesControllers = require("../Controllers/PlacesControllers.jsx");
const router = express.Router();

router.get('/:pid', PlacesControllers.getPlaceById);

router.get("/user/:uid" , PlacesControllers.getPlacesByUserId); 

router.post(
        "/" , 
        [
            check("title").notEmpty().isEmpty() , 
            check("description").isLength({min : 5}) ,
            check("address").not().isEmpty() ,
        ] , 
        PlacesControllers.createPlace
    );

router.patch("/:pid" , PlacesControllers.updatePlace);

router.delete("/:pid" , PlacesControllers.deletePlace);

module.exports = router;