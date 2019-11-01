const  express  = require('express');
const app = express();

const attractionRoutes = require('./api/routes/attractions');
const tripRoutes = require('./api/routes/trips')

app.use('/attractions', attractionRoutes);
app.use('/trips', tripRoutes);

module.exports = app;
