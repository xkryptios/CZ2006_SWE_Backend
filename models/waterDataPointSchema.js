const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const WaterDataPointSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    WashingMachine: {
        type: Number,
        required: true
    },
    ToiletFlush: {
        type: Number,
        required: true
    },
    Shower: {
        type: Number,
        required: true
    },
    Taps: {
        type: Number,
        required: true
    }
})

const WaterDataPoint = mongoose.model('WaterDataPoint', WaterDataPointSchema, 'WaterDataPoints');
module.exports = WaterDataPoint