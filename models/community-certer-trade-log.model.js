const mongoose = require('mongoose');

const TradableResourceSchema = mongoose.Schema(
    {
        doctor: {
            type: Number,
        },
        voluntary: {
            type: Number,
        },
        medKit: {
            type: Number,
        },
        vehicle: {
            type: Number,
        },
        foodParcel: {
            type: Number,
        },
    }
);
const CommunityCenterTradeSchema = mongoose.Schema(
    {
        firstCenterId: {
            type: String,
            required: [true, 'Center id required']
        },
        firstCenterName: {
            type: String,
            required: [true, 'Center name required']
        },
        firstCenterTradeResources: [TradableResourceSchema],
        secondCenterId: {
            type: String,
            required: [true, 'Center id required']
        },
        secondCenterName: {
            type: String,
            required: [true, 'Center name required']
        },
        secondCenterTradeResources: [TradableResourceSchema],

    },
    {
        timestamps: true,
    }
);

const CommunityCenterTrade = mongoose.model('CommunityCenterTradeSchema', CommunityCenterTradeSchema);

module.exports = CommunityCenterTrade;