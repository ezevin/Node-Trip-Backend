const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const TripsController = require('../controllers/trips');

//Handle incoming GET requests to /trips //
router.get('/', checkAuth, TripsController.trips_get_all);

router.post('/', checkAuth, TripsController.trips_create_trips);

router.get('/:tripId', checkAuth, TripsController.trips_get_trip);

router.patch('/:tripId', checkAuth, TripsController.trips_update_trip);

router.delete('/:tripId', checkAuth, TripsController.trips_delete_trip);


module.exports = router;
