const User = require('../models/userSchema')
const WaterDataPoint = require('../models/waterDataPointSchema')
const ElectricityDataPoint = require('../models/electricityDataPointSchema')
const processData = require('./PocessData')
//getter function to retrive user, water datapoint, electrcity datapoint
const getUser = async (userID) => {
    return new Promise((resolve, reject) => {
        User.find({ id: userID }, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}
const getWaterDatas = async (userID) => {
    return new Promise((resolve, reject) => {
        WaterDataPoint.find({ id: userID }, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}


const getElectricityDatas = async (userID) => {
    return new Promise((resolve, reject) => {
        ElectricityDataPoint.find({ id: userID }, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

async function getINFO(userID) {
    const userData = await getUser(userID)
    // console.log(userData)
    const waterDatas = await getWaterDatas(userID)
    // console.log(waterDatas)
    const electricityDatas = await getElectricityDatas(userID)
    // console.log(electricityDatas)
    return ({
        userData: userData[0],
        waterData: waterDatas,
        electricityData: electricityDatas
    })
}

const find_user_info = async (req, res) => {
    const userID = req.params.userID
    const data = await getINFO(userID)

    const processedData = processData(data)
    //res.send("water goes brrr")
    res.send(processedData)
}

const findAll = (req, res) => {
    User.find({}, (err, result) => {
        if (!err)
            res.send(result)

    })
}





module.exports = {
    find_user_info,
    // find_user_info_dated,
    findAll
}