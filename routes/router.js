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


module.exports = router;