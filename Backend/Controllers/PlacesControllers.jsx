const HttpError = require("../Models/HttpError.jsx");
const { v4: uuidv4 } = require('uuid');
const {validationResult} = require("express-validator");
const getCoordsForAddress = require("../Util/Location.jsx");


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



const getPlaceById = (req, res, next) => {
    const placeId = req.params.pid;
    const place = dummyPlaces.find(p => {
      return p.id === placeId
    });
  
    if(!place) {
      throw new HttpError("Could not find a place for the provided id." , 404);
      } else {
      res.json({place : place});
    }
    
  };


const getPlacesByUserId =  (req , res , next) => {
    const userId = req.params.uid;
    const places = dummyPlaces.filter(p => {
        return p.creator === userId;
    });
 
    if(!places || places.length === 0) {
        next(new HttpError("Could not find places for the provided user id." , 404));
      } else {
        res.json({places});
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
   
    const createdPlace = {
        id: uuidv4(),
        title,
        description,
        location: coordinates,
        address,
        creator
    };

    dummyPlaces.push(createdPlace);

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