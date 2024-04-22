const HttpError = require("../Models/HttpError.jsx");
const { v4: uuidv4 } = require('uuid');
const {validationResult} = require("express-validator");
const getCoordsForAddress = require("../Util/Location.jsx");
const Place = require("../Models/place.jsx");


let dummyPlaces = [
    {
        id : "p1" , 
        title : "Empire state building" ,
        description : "one of the most famous sky scrapers in the world" , 
        location : {
            lat : 40.7484474 , 
            lng : -73.9871516
        } ,
        address : "20 w 34th st , new york , ny 10001" , 
        creator : "u1" ,
    }
]



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
    let places;
    try {
        places = await Place.find({creator : userId});
    } catch(err) {
        const error = new HttpError("Fetching places failed , please try again later" , 500);
        return next(error);
    };
    
    if(!places || places.length === 0) {
        next(new HttpError("Could not find places for the provided user id." , 404));
      } else {
        res.json({places: places.map(place => place.toObject({getters: true}))});
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
    })

    try {
        await createdPlace.save();
    } catch(err) {
        const error = new HttpError("Creating place failed, please try again" , 500);
        return next(error);
    };
    
    
    // Send response only if validation passes
    res.status(201).json({ place: createdPlace });
};



const updatePlace = (req , res , next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        throw new HttpError("Invalid inputs passed , please check your data" , 422);
    };
     
    const {title , description} = req.body;
    const placeId = req.params.pid;

    const updatedPlace = {...dummyPlaces.find(p => p.id === placeId)};
    const placeIndex = dummyPlaces.findIndex(p => p.id === placeId);
    updatedPlace.title = title;
    updatedPlace.description = description;

    dummyPlaces[placeIndex] = updatedPlace;

    res.status(200).json({place : updatedPlace});
};

const deletePlace = (req , res , next) => {
    const placeId = req.params.pid;
    if(!dummyPlaces.find(p => p.id === placeId)) {
        throw new HttpError("Could not find a place for that id." , 404);
    }
    dummyPlaces = dummyPlaces.filter(p => p.id !== placeId);
    res.status(200).json({message : "Deleted place"});
}


exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;