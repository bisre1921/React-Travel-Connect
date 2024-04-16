const HttpError = require("../Models/HttpError.jsx"); 

const dummyPlaces = [
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
      throw new HttpErrorError("Could not find a place for the provided id." , 404);
      } else {
      res.json({place : place});
    }
    
  };


const getPlaceByUserId =  (req , res , next) => {
    const userId = req.params.uid;
    const place = dummyPlaces.find(p => {
        return p.creator === userId;
    });

    if(!place) {
        next(new HttpErrorError("Could not find a place for the provided user id." , 404));
      } else {
        res.json({place});
      }
    
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;