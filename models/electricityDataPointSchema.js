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
    aircon: {
        type: Number,
        required: true
    },
    fridge: {
        type: Number,
        required: true
    },
    tv: {
        type: Number,
        required: true
    },
    waterHeater: {
        type: Number,
        required: true
    },
    misc: {
        type: Number,
        required: true
    }
})

const ElectricityDataPoint = mongoose.model('ElectricityDataPoint', ElectricityDataPointSchema, 'ElectricityDataPoints');
module.exports = ElectricityDataPoint