const mongoose = require('mongoose');

const attractionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    location: { type: String, required: true },
    attractionImage: { type: String, required: true }
});

module.exports = mongoose.model('Attraction', attractionSchema);
