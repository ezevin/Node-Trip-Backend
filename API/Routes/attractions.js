const express = require('express')
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET requests to /attractions'
  })
});

router.post('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling POST requests to /attractions'
  })
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
    })
  }
})

router.post('/', (req, res, next) => {
  res.status(201).json({
    message: 'Attraction was created!'
  })
})

router.patch('/:attractionId', (req, res, next) => {
  res.status(200).json({
    message: 'Updated Attraction!'
  })
})

router.delete('/:attractionId', (req, res, next) => {
  res.status(200).json({
    message: 'Deleted Attraction!'
  })
})


module.exports = router;
