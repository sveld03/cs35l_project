const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    user_id_1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    user_id_2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    matched_at: {
        type: Date,
        default: Date.now
    },
    skill_level: {
        type: String
    },
    preferred_gym_time: {
        type: [String]  // Array of strings
    },
    preferred_workout_duration: {
        type: Number
    }
});

module.exports = mongoose.model('Match', matchSchema);

