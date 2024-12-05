const mongoose = require('mongoose');

const gymDataSchema = new mongoose.Schema({
    Equipment_Name: {
        type: String,
        required: true
    },
    Quantity: {
        type: Number,
        required: true
    },
    Location: {
        type: String,
        required: true
    },
    Picture: {
        type: String,
        enum: ['Yes', 'No'],
        required: true
    },
    Cardio_Resistance: {
        type: String,
        enum: ['Cardio', 'Resistance'],
        required: true
    },
    Muscle_Groups: {
        type: String,
        required: true
    },
    Free_Body_Machine: {
        type: String,
        enum: ['Free', 'Bodyweight', 'Machine'],
        required: true
    },
    Uni_Bi: {
        type: String,
        enum: ['Unilateral', 'Bilateral'],
        required: true
    }
}, { collection: 'gymMachines' });

const gymData = mongoose.model('gymData', gymDataSchema);

module.exports = gymData;
