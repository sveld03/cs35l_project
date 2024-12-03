const mongoose = require('../db');

const availabilitySchema = new mongoose.Schema({
  day: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    required: true
  },
  times: {
    type: [String],
    enum: ['Morning', 'Afternoon', 'Evening'],
    required: true
  }
});

module.exports = availabilitySchema;
