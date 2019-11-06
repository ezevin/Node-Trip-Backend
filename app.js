const express  = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const attractionRoutes = require('./api/routes/attractions');
const tripRoutes = require('./api/routes/trips');

mongoose.connect(
  "mongodb+srv://HauntedHouse:" + process.env.MONGO_ATLAS_PW + "@hauntedattractions-cknam.mongodb.net/test?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
  },
 () => console.log("\x1b[35m","  Database is connected...")
);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
});

// Route  handling Requests //
app.use('/attractions', attractionRoutes);
app.use('/trips', tripRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status ||  500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
