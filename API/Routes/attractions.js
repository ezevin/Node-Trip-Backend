const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Attraction = require('../models/attraction');

router.get('/', (req, res, next) => {
  Attraction.find()
    .select('name location _id')
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        attractions: docs.map(doc => {
          return {
            name: doc.name,
            location: doc.location,
            _id: doc._id,
            request: {
              type: 'GET',
              url: 'http://localhost:3002/attractions/' + doc._id
            }
          }
        })
      };
      res.status(200).json(response);
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
        message: 'Created Attraction Successfully',
        createdAttraction: {
          name: result.name,
          location: result.location,
          _id: result._id,
          request: {
            type: 'GET',
            url: 'http://localhost:3002/attractions/' + result._id
          }
        }
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
    .select('name location _id')
    .exec()
    .then(doc => {
    console.log("From database", doc);
    if (doc){
       res.status(200).json({
         attraction: doc,
         request: {
           types: 'GET',
           url: 'http://localhost:3002/attractions/'
         }
       })
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
      res.status(200).json({
        message: "Attraction updated",
        url: 'http://localhost:3002/attractions/' + id
      });
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
      res.status(200).json({
        message: 'Product deleted',
        request: {
          type: 'POST',
          url: 'http://localhost:3002/attractions/',
          body: { name: 'String', location: 'String'} 
        }
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
})


module.exports = router;
