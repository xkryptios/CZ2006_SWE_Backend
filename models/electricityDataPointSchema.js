const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ElectricityDataPointSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    Aircon: {
        type: Number,
        required: true
    },
    Fridge: {
        type: Number,
        required: true
    },
    TV: {
        type: Number,
        required: true
    },
    WaterHeater: {
        type: Number,
        required: true
    },
    Misc: {
        type: Number,
        required: true
    }
})

const ElectricityDataPoint = mongoose.model('ElectricityDataPoint', ElectricityDataPointSchema, 'ElectricityDataPoints');
module.exports = ElectricityDataPoint