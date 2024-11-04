const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    workout_date: {
        type: Date,
        required: true
    },
    workout_type: {
        type: String,
        required: true
    },
    duration: {
        type: Number,  // in mins
        required: true
    },
    notes: {
        type: String
    }
});

module.exports = mongoose.model('Workout', workoutSchema);

