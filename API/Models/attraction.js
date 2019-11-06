const mongoose = require('mongoose');

const attractionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    location: String
});

module.exports = mongoose.model('Attraction', attractionSchema);
