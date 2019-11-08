const express = require('express')
const router = express.Router();

//Handle incoming GET requests to /trips //
router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET requests to /trips'
  })
});

router.post('/', (req, res, next) => {
  const trip = {
    tripId: req.body.tripId,
    attractionId: req.body.attractionId
  };
  res.status(200).json({
    message: 'Handling POST requests to /trips',
    trip: trip
  });
});

router.get('/:tripId', (req, res, next) => {
  const id = req.params.tripId;
  if(id === 'special'){
    res.status(200).json({
      message: "You discovered the special ID",
      id: id
    })
  }else {
    res.status(200).json({
      message: 'You passed an ID'
    })
  }
});

router.patch('/:tripId', (req, res, next) => {
  res.status(200).json({
    message: 'Updated Trip!'
  })
})

router.delete('/:tripId', (req, res, next) => {
  res.status(200).json({
    message: 'Deleted Trip!'
  })
})


module.exports = router;
