const mongoose = require('mongoose');

const ResourceSchema = mongoose.Schema(
    {
        doctor: {
            type: Number,
            required: [true, 'Doctor quantity required']
        },
        voluntary: {
            type: Number,
            required: [true, 'Voluntary quantity required']
        },
        medKit: {
            type: Number,
            required: [true, 'Med kit quantity required']
        },
        vehicle: {
            type: Number,
            required: [true, 'Vehicle quantity required']
        },
        foodParcel: {
            type: Number,
            required: [true, 'Food parcel quantity required']
        },
    }
);
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
        },
        resources: {
            type: ResourceSchema,
            required: [true, 'Resources required']
        },
    },
    {
        timestamps: true,
    }
);

const CommunityCenter = mongoose.model('CommunityCenter', CommunityCenterSchema);

module.exports = CommunityCenter;