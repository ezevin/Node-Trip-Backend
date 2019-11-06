const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Attraction = require('../Models/attraction');

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET requests to /attractions'
  })
});

router.post('/', (req, res, next) => {
  const attraction = new Attraction({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    location: req.body.location
  });
  attraction
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: 'Handling POST requests to /attractions',
        createdAttraction: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get('/:attractionId', (req, res, next) => {
  const id = req.params.attractionId;
  if(id === 'special'){
    res.status(200).json({
      message: "You discovered the special ID",
      id: id
    })
  }else {
    res.status(200).json({
      message: 'You passed an ID'
    });
  };
});

// router.post('/', (req, res, next) => {
//   const attraction = {
//     name: req.body.name,
//     location: req.body.location
//   };
//   res.status(201).json({
//     message: 'Attraction was created!',
//     createdAttraction: attraction
//   });
// });

router.patch('/:attractionId', (req, res, next) => {
  res.status(200).json({
    message: 'Updated Attraction!'
  });
});

router.delete('/:attractionId', (req, res, next) => {
  res.status(200).json({
    message: 'Deleted Attraction!'
  })
})


module.exports = router;
