const User = require('../models/userSchema')
const WaterDataPoint = require('../models/waterDataPointSchema')
const ElectricityDataPoint = require('../models/electricityDataPointSchema')

const create_new_user = (req, res) => {
    const userID = req.params.userID
    console.log(userID)
    const user = new User({
        id: userID,
        electricitySupplier: 'SupplierX',
        waterBudget: Number(0),
        electricityBudget: Number(0)
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

const createStatic = async (userID) => {
    //create 24 * 14 = 336 worth of data point
    let waterArray = []
    let electricityArray = []
    let octDate = new Date(2021, 9, 1, 0, 0, 0, 0)
    for (let i = 0; i < 24 * 14; i++) {
        let currentDate = new Date(octDate.getTime() + i * (60 * 60000))
        waterArray.push({
            id: userID,
            date: currentDate,
            washingMachine: Number(Math.random() * 100 + 1),
            toiletFlush: Number(Math.random() * 100 + 1),
            shower: Number(Math.random() * 100 + 1),
            taps: Number(Math.random() * 100 + 1)
        })
        electricityArray.push({

            id: userID,
            date: currentDate,
            aircon: Number(Math.random() * 100 + 1),
            fridge: Number(Math.random() * 100 + 1),
            tv: Number(Math.random() * 100 + 1),
            waterHeater: Number(Math.random() * 100 + 1),
            misc: Number(Math.random() * 100 + 1)

        })
    }
    //create 12 datapoints (first hr of each month indicate )
    for (let i = 1; i <= 12; i++) {

        let pastDate = new Date(octDate.getTime() - (i * 43200 * 60000))
        // console.log(pastDate.toString())
        waterArray.push({
            id: userID,
            date: pastDate,
            washingMachine: Number(Math.random() * 100 + 1),
            toiletFlush: Number(Math.random() * 100 + 1),
            shower: Number(Math.random() * 100 + 1),
            taps: Number(Math.random() * 100 + 1)
        })
        electricityArray.push({

            id: userID,
            date: pastDate,
            aircon: Number(Math.random() * 100 + 1),
            fridge: Number(Math.random() * 100 + 1),
            tv: Number(Math.random() * 100 + 1),
            waterHeater: Number(Math.random() * 100 + 1),
            misc: Number(Math.random() * 100 + 1)

        })
    }

    for (let item of waterArray) {
        const waterDP = new WaterDataPoint(item)
        await waterDP.save()
    }
    for (let item of electricityArray) {
        const electricityDP = new ElectricityDataPoint(item)
        await electricityDP.save()
    }
}

module.exports = {
    create_new_user,
    createElectricityDataPoint,
    createWaterDataPoint,
    createStatic
}