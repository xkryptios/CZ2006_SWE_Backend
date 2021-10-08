const User = require('../models/userSchema')
const WaterDataPoint = require('../models/waterDataPointSchema')
const ElectricityDataPoint = require('../models/electricityDataPointSchema')

const deleteAll = (req, res) => {
    User.collection.drop((err, result) => {
        res.send("usrs deleted")
    })
    // const resul2 = WaterDataPoint.collection.drop()
    // const result3 = ElectricityDataPoint.collection.drop()
    // res.send("all items deleted")
}


module.export = deleteAll