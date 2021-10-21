const express = require('express');
const router = express.Router();
const Creater = require("../controllers/CreateController")
const Setter = require("../controllers/SetterController")
const Query = require("../controllers/QueryController")
// const deleteAll = require('../controllers/DeleteController')

const WaterDataPoint = require('../models/waterDataPointSchema')
const ElectricityDataPoint = require('../models/electricityDataPointSchema');
const User = require('../models/userSchema');



router.get('/register/:userID', Creater.create_new_user)

router.get('/setElectricitySupplier/:userID/:supplier', Setter.setElectricitySupplier)
router.get('/setWaterBudget/:userID/:quantity', Setter.setWaterBudget)
router.get('/setElectricityBudget/:userID/:quantity', Setter.setElectricityBudget)

router.get('/api/:userID', Query.find_user_info)
router.get('/apidates/:userID', Query.find_user_info_dated)
//router.get('/waterapidates/:userID', Query.find_user_info_water_dated)

//testing functions
router.get('/getall', Query.findAll)
router.get('/dropall', async (req, res) => {
    await User.collection.drop()
    await WaterDataPoint.collection.drop()
    await ElectricityDataPoint.collection.drop()
    res.send("usr deleted")
})




//a route used to create random datapoints(both ) for a given user
router.get('/createdata/:userID', async (req, res) => {
    const userID = req.params.userID

    const waterDataPoint = new WaterDataPoint({
        id: userID,
        date: new Date(),
        WashingMachine: Number(Math.random() * 100 + 1),
        ToiletFlush: Number(Math.random() * 100 + 1),
        Shower: Number(Math.random() * 100 + 1),
        Taps: Number(Math.random() * 100 + 1)
    })
    const waterData = await waterDataPoint.save()

    const electricityDataPoint = new ElectricityDataPoint({
        id: userID,
        date: new Date(),
        Aircon: Number(Math.random() * 100 + 1),
        Fridge: Number(Math.random() * 100 + 1),
        TV: Number(Math.random() * 100 + 1),
        WaterHeater: Number(Math.random() * 100 + 1),
        Misc: Number(Math.random() * 100 + 1)
    })
    const electricityData = await electricityDataPoint.save()

    res.send({ waterData: waterData, electricityData: electricityData })
})

//Trev test insert fixed data.
router.get('/testdata/:userID', async (req, res) => {
    const userID = req.params.userID

    const waterDataPoint = new WaterDataPoint({
        id: userID,
        date: new Date("2021-09-01T12:00:00Z"),
        WashingMachine: Number(100),
        ToiletFlush: Number(200),
        Shower: Number(300),
        Taps: Number(400)
    })
    const waterData = await waterDataPoint.save()

    const electricityDataPoint = new ElectricityDataPoint({
        id: userID,
        date: new Date("2021-11-01T12:00:00Z"),
        Aircon: Number(101),
        Fridge: Number(201),
        TV: Number(301),
        WaterHeater: Number(401),
        Misc: Number(501)
    })
    const electricityData = await electricityDataPoint.save()

    res.send({ waterData: waterData, electricityData: electricityData })
})

//see all data.
router.get('/seedata/:userID', async (req, res) => {
    const userID = req.params.userID

    const waterDataPoint = new getWaterDatas(userID)
    const electricityDataPoint = new getElectricityDatas(userID)

    res.send({
        userData: userData, waterData: waterDataPoint,
        electricityData: electricityDataPoint
    })
})


//test to find data after certain date
router.get('/datadate/:userID', async (req, res) => {
    const userID = req.params.userID

    const waterDataPoint = new getWaterDatas(userID)
    const electricityDataPoint = new getElectricityDatas(userID)

    res.send({
        userData: userData, waterData: waterDataPoint,
        electricityData: electricityDataPoint
    })
})

module.exports = router;