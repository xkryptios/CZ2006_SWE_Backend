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
    washingMachine: {
        type: Number,
        required: true
    },
    toiletFlush: {
        type: Number,
        required: true
    },
    shower: {
        type: Number,
        required: true
    },
    taps: {
        type: Number,
        required: true
    }
})

const WaterDataPoint = mongoose.model('WaterDataPoint', WaterDataPointSchema, 'WaterDataPoints');
module.exports = WaterDataPoint