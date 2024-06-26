const express = require('express');
const { check } = require("express-validator");
 
const PlacesControllers = require("../Controllers/PlacesControllers.jsx");
const fileUpload = require('../middleware/file-upload.jsx');
const CheckAuth = require('../middleware/CheckAuth.jsx');
const router = express.Router();

router.get('/:pid', PlacesControllers.getPlaceById);

router.get("/user/:uid" , PlacesControllers.getPlacesByUserId); 

router.use(CheckAuth);

router.post(
        "/" , 
        fileUpload.single("image") ,
        [
            check("title").notEmpty().isEmpty() , 
            check("description").isLength({min : 5}) ,
            check("address").not().isEmpty() ,
        ] , 
        PlacesControllers.createPlace
    );

router.patch(
        "/:pid" , 
        [
            check("title").not().isEmpty() , 
            check("description").isLength({min : 5}) ,
        ] ,
        PlacesControllers.updatePlace ,
    );

router.delete("/:pid" , PlacesControllers.deletePlace);

module.exports = router;