const mongoose = require('mongoose');

const CommunityCenterSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name required']
        },
        address: {
            type: String,
            required: [false, 'Address required']
        },
        location: {
            type: String,
            required: [false, 'Location required']
        },
        maxOcupation: {
            type: Number,
            required: [false, 'Max Ocupation required']
        },
        currentlyOcupation: {
            type: Number,
            required: [false, 'Currently Ocupation required']
        }
    },
    {
        timestamps: true,
    }
);

const CommunityCenter = mongoose.model('CommunityCenter', CommunityCenterSchema);

module.exports = CommunityCenter;