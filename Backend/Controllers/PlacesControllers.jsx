const HttpError = require("../Models/HttpError.jsx");
const { v4: uuidv4 } = require('uuid');
const {validationResult} = require("express-validator");
const getCoordsForAddress = require("../Util/Location.jsx");
const Place = require("../Models/place.jsx");
const User = require("../Models/user.jsx");
// const { default: mongoose } = require("mongoose");
const mongoose = require("mongoose");






const getPlaceById = async (req, res, next) => {
    const placeId = req.params.pid;
    let place;
    try {
        place = await Place.findById(placeId);
    } catch(err) {
        const error = new HttpError("Something went wrong, Could not find a place" , 500);
        return next(error);
    }
    
  
    if(!place) {
      const error = new HttpError("Could not find a place for the provided id." , 404);
      return next(error);
      } else {
      res.json({place : place.toObject({getters: true})});
    }
    
  };


const getPlacesByUserId = async (req , res , next) => {
    const userId = req.params.uid;
    // let places;
    let userWithPlaces;
    try {
        userWithPlaces = await User.findById(userId).populate("places");
    } catch(err) {
        const error = new HttpError("Fetching places failed , please try again later" , 500);
        return next(error);
    };
    
    if(!userWithPlaces || userWithPlaces.length === 0) {
        next(new HttpError("Could not find places for the provided user id." , 404));
      } else {
        res.json({places: userWithPlaces.map(place => place.toObject({getters: true}))});
      }
    
};

const createPlace = async (req, res, next) => {
    
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return next(
    //         new HttpError('Invalid inputs passed, please check your data.', 422)
    //     );
    // }

    const { title, description , address, creator } = req.body;

    let coordinates;
    try {
        coordinates = await getCoordsForAddress(address);
    } catch (error) {
        return next(error);
    }
   
    const createdPlace = new Place({
        title , 
        description , 
        address , 
        location : coordinates , 
        image : "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/400px-Empire_State_Building_%28aerial_view%29.jpg" ,
        creator
    });

    let user;

    try {
        user = await User.findById(creator);
    } catch (err) {
        const error = new HttpError("creating place failed, please try again" , 500);
        return next(error);
    }

    if(!user) {
        const error = new HttpError("Could not find user for provided id" , 404);
        return next(error);
    }
    console.log(user);

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdPlace.save({session: sess});
        user.places.push(createdPlace);
        await user.save({session: sess});
        await sess.commitTransaction();
    } catch(err) {
        const error = new HttpError("Creating place failed, please try again" , 500);
        return next(error);
    };
    
    
    // Send response only if validation passes
    res.status(201).json({ place: createdPlace });
};



const updatePlace = async (req , res , next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        throw new HttpError("Invalid inputs passed , please check your data" , 422);
    };
     
    const {title , description} = req.body;
    const placeId = req.params.pid;

    let place;
    try {
        place = await Place.findById(placeId);
    } catch(err) {
        const error = new HttpError("Something went wrong, Could not update place" , 500);
        return next(error);
    }

   
    place.title = title;
    place.description = description;

    try {
        await place.save();
    } catch(err) {
        const error = new HttpError("Something went wrong, Could not update place" , 500);
        return next(error);
    }

    

    res.status(200).json({place : place.toObject({getters : true})});
};

const deletePlace = async (req , res , next) => {
    const placeId = req.params.pid;
    let place;
    try{
        place = await Place.findById(placeId).populate("creator");
    } catch(err) {
        const error = new HttpError("Something went wrong, Could not update place" , 500);
        return next(error);
    };

    if (!place) {
        const error = new HttpError("Could not find place with the provided ID" , 404);
        return next(error);
    }

    try {
        const sees = await mongoose.startSession();
        sess.startTransaction();
        await place.deleteOne({session: sess});
        place.creator.places.pull(place);
        await place.creator.save({session: sess});
        await sess.commitTransaction();
        // await place.deleteOne();
      } catch (err) { 
        console.error(err);
        const error = new HttpError(`Something went wrong, could not delete place. ${err} `, 500);
        return next(error);
      }
    


    res.status(200).json({message : "Deleted place"});
}


exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;