const express = require('express');
const router = express.Router();
const Creater = require("../controllers/CreateController")
const Setter = require("../controllers/SetterController")
const Query = require("../controllers/QueryController")
// const deleteAll = require('../controllers/DeleteController')

const WaterDataPoint = require('../models/waterDataPointSchema')
const ElectricityDataPoint = require('../models/electricityDataPointSchema');
const User = require('../models/userSchema');


//create a new user in the database
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

router.get('/do/:userID', (req, res) => {
    Creater.createStatic(req.params.userID)
    res.send('hello')
})

module.exports = router;