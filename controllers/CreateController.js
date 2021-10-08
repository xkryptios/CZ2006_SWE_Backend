const User = require('../models/userSchema')
const WaterDataPoint = require('../models/waterDataPointSchema')
const ElectricityDataPoint = require('../models/electricityDataPointSchema')

const create_new_user = (req, res) => {
    const userID = req.params.userID
    console.log(userID)
    const user = new User({
        id: userID,
        electricitySupplier: undefined,
        waterBudget: undefined,
        electricityBudget: undefined
    })
    user.save()
        .then((result) => {
            console.log("new user: " + userID + " has been added to collection")
            res.send(result)
        })
        .catch((err) => console.log(err))

}

const createWaterDataPoint = (params) => {
    waterData = new WaterDataPoint(params)
    waterData.save().then((result) => {
        console.log("new water dataPoint added for " + params.id)
        return result
    }).catch((err) => {
        console.log(err)
    })

}
const createElectricityDataPoint = async (params) => {
    try {
        electrictyData = new ElectricityDataPoint(params)
        const result = await electrictyData.save()
        console.log("new electricity dataPoint added for " + params.id)
        return result
    } catch (err) {
        console.log(err)
    }

}


module.exports = {
    create_new_user,
    createElectricityDataPoint,
    createWaterDataPoint,
}