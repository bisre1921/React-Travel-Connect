const express = require('express');

const router = express.Router();

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

router.get('/:pid', (req, res, next) => {
  const placeId = req.params.pid;
  const place = dummyPlaces.find(p => {
    return p.id === placeId
  });
  res.json({place : place});
});

module.exports = router;