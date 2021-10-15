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

//trev test
const getWaterDatasDated = async (userID) => {
    return new Promise((resolve, reject) => {
        WaterDataPoint.find({ id: userID, date: {$gte: checkDate()} }, (err, result) => {
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

const getElectricityDatasDated = async (userID) => {
    return new Promise((resolve, reject) => {
        ElectricityDataPoint.find({ id: userID, date: {$gte: checkDate()} }, (err, result) => {
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
        userData: userData,
        waterData: waterDatas,
        electricityData: electricityDatas
    })
}

//trev test
async function getINFOdated(userID) {
    const userData = await getUser(userID)
    // console.log(userData)
    const waterDatas = await getWaterDatasDated(userID)
    // console.log(waterDatas)
    const electricityDatas = await getElectricityDatasDated(userID)
    // console.log(electricityDatas)
    return ({
        userData: userData,
        waterData: waterDatas,
        electricityData: electricityDatas
    })
}

const find_user_info = async (req, res) => {
    const userID = req.params.userID
    const data = await getINFO(userID)
    processData(data)
    //res.send("water goes brrr")
	res.send({ userData: data.userData, waterData: data.waterData,
	electricityData: data.electricityData })
}

//trev test
const find_user_info_dated = async (req, res) => {
    const userID = req.params.userID
    const data = await getINFOdated(userID)
    processData(data)
    //res.send("water goes brrr")
	res.send({ userData: data.userData, waterData: data.waterData,
	electricityData: data.electricityData })
}

function checkDate(){
	const currentDate = new Date()
	var current_month = currentDate.getMonth()
	var current_day = currentDate.getDate()
	var current_year = currentDate.getFullYear()
	const point = (current_year + "-" + current_month + "-" + current_day)
	//const point = new Date("2021-10-11T00:00:00.000Z")
	return point
}



const findAll = (req, res) => {
    User.find({}, (err, result) => {
        if (!err)
            res.send(result)

    })
}





module.exports = {
    find_user_info,
	find_user_info_dated,
    findAll
}