const User = require('../models/userSchema')
const WaterDataPoint = require('../models/waterDataPointSchema')
const ElectricityDataPoint = require('../models/electricityDataPointSchema')


const setElectricitySupplier = (req, res) => {

    id = req.params.userID
    supplier = req.params.supplier

    User.findOneAndUpdate({ id: id }, { electricitySupplier: supplier }, {
        new: true
    }, (err, updatedData) => {
        console.log(updatedData)
        res.send(updatedData)
    })

}

const setWaterBudget = (req, res) => {
    id = req.params.userID
    quantity = req.params.quantity

    User.findOneAndUpdate({ id: id }, { waterBudget: Number(quantity) }, {
        new: true
    }, (err, updatedData) => {
        console.log(updatedData)
        res.send(updatedData)
    })


}

const setElectricityBudget = (req, res) => {
    id = req.params.userID
    quantity = req.params.quantity

    User.findOneAndUpdate({ id: id }, { electricityBudget: Number(quantity) }, {
        new: true
    }, (err, updatedData) => {
        console.log(updatedData)
        res.send(updatedData)
    })


}

module.exports = {
    setElectricityBudget,
    setWaterBudget,
    setElectricitySupplier
}