const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Trip = require('../models/trip');
const Attraction = require('../models/attraction');
//Handle incoming GET requests to /trips //
router.get('/', (req, res, next) => {
  Trip.find()
    .select('attraction quantity _id')
    .populate('attraction', 'name location')
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        trips: docs.map(doc => {
          return {
            _id: doc._id,
            attraction: doc.attraction,
            quantity: doc.quantity,
            request:  {
              type: 'GET',
              url: 'http://localhost:3002/trips/' + doc._id
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post('/', (req, res, next) => {
  Attraction.findById(req.body.attractionId)
    .then(attraction => {
      if(!attraction){
        return res.status(404).json({
          message: "Product not found."
        });
      }
      const trip = new Trip({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        attraction: req.body.attractionId
      });
      return trip.save();
      })
      .then(result => {
        console.log(result);
        res.status(201).json({
          message:  "Trip stored",
          createdTrip: {
            _id: result._id,
            attraction: result.attraction,
            quantity: result.quantity
          },
          request: {
            type: 'GET',
            url: 'http://localhost:3002/trips/' + result._id
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

router.get('/:tripId', (req, res, next) => {
  Trip.findById(req.params.tripId)
    .populate('attraction')
    .exec()
    .then(trip => {
      if(!trip){
        return res.status(404).json({
          message: 'Trip not found'
        })
      }
      res.status(200).json({
        trip: trip,
        request: {
          type: 'GET',
          url: 'http://localhost:3002/trips/'
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    });
});

router.patch('/:tripId', (req, res, next) => {
  res.status(200).json({
    message: 'Updated Trip!'
  })
})

router.delete('/:tripId', (req, res, next) => {
  Trip.remove({ _id: req.params.tripId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Trip deleted',
        request: {
          type: 'POST',
          url: 'http://localhost:3002/trips/',
          body: {
            productId: 'ID',
            quantity: 'Number'
          }
        }
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    });
})


module.exports = router;
