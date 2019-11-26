const mongoose = require('mongoose');

const tripSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    attraction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Attraction',
      required: true
    },
    quantity: {
      type: Number,
      default: 1
    }
});

module.exports = mongoose.model('Trip', tripSchema);
