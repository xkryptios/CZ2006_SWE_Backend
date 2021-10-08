const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    electricitySupplier: {
        type: String,
        required: false
    },
    waterBudget: {
        type: Number,
        required: false
    },
    electricityBudget: {
        type: Number,
        required: false
    }

});

const User = mongoose.model("User", userSchema, 'Users');
module.exports = User