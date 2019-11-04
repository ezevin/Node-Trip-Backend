const  express  = require('express');
const app = express();
const morgan = require('morgan');

const attractionRoutes = require('./api/routes/attractions');
const tripRoutes = require('./api/routes/trips');

app.use(morgan('dev'));

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
