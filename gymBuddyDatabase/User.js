const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password_hash: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other']
    },
    location: {
        type: String
    },
    skill_level: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced']
    },
    preferred_gym_time: {
        type: [String],  // Array of strings
        required: true
    },
    preferred_workout_duration: {
        type: Number,
        required: true
    },
    goals: {
        type: [String]  // Array of strings
    },
    availability: {
        type: [String]  // Array of strings
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);

