const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Attraction = require('../models/attraction');

router.get('/', (req, res, next) => {
  Attraction.find()
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
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
  Attraction.findById(id)
    .exec()
    .then(doc => {
    console.log("From database", doc);
    if (doc){
       res.status(200).json(doc)
    } else {
      res.status(404).json({
        message: "No valid entry found for provided ID"
      })
    }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });
});

router.patch('/:attractionId', (req, res, next) => {
  const id = req.params.attractionId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Attraction.update({ _id: id}, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete('/:attractionId', (req, res, next) => {
  const id = req.params.attractionId;
  Attraction.remove({_id: id})
    .exec()
    .then(result => {
      console.log(docs);
      res.status(200).json(docs)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
})


module.exports = router;
