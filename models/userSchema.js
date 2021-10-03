const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// const dataPointSchema = new Schema({
//     date: {
//         type: Date,
//         required: true
//     },
//     consumption: {
//         type: Number,
//         required: true
//     }
// })

const userSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    waterData: {
        //the array is intended to be of DataPoints instead
        type: [{}]
    },
    ElectricityData: {
        //the array is intended to be of DataPoints instead
        type: [{}]
    }

    // { timestamps: true }}


}, { timestamps: true });

const User = mongoose.model("User", userSchema, 'Users');
module.exports = User