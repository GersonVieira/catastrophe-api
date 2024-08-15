const mongoose = require('mongoose');

const CommunityCenterSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name required']
        },
        address: {
            type: String,
            required: [true, 'Address required']
        },
        location: {
            type: String,
            required: [true, 'Location required']
        },
        maxOcupation: {
            type: Number,
            required: [true, 'Max Ocupation required']
        },
        currentlyOcupation: {
            type: Number,
            required: [true, 'Currently Ocupation required']
        }
    }
);