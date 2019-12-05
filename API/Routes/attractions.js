const express = require("express");
const router = express.Router();
const multer = require("multer");
const checkAuth = require('../middleware/check-auth');

const AttractionsController = require('../controllers/attractions');

const  storage = multer.diskStorage({
  destination: function(req, file, cb) {
   cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  //reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
   cb(null, true);
 } else {
   cb(null, false);
 }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.get('/', AttractionsController.attractions_get_all);

router.post('/', checkAuth, upload.single('attractionImage'), AttractionsController.attractions_create_attraction);

router.get('/:attractionId', AttractionsController.attractions_get_attraction);

router.patch('/:attractionId', checkAuth, AttractionsController.attraction_update_attraction);

router.delete('/:attractionId', checkAuth, AttractionsController.attraction_delete_attraction);

module.exports = router;
