const User = require('../models/userSchema')
const WaterDataPoint = require('../models/waterDataPointSchema')
const ElectricityDataPoint = require('../models/electricityDataPointSchema')


// function that starts the addition at then nearest 10mins mark
const interval10mins = 600000
//create a timer till the nxt 10min mark


const addDataPoint = async () => {
    const time = new Date();
    console.log("adding data @ " + time)
    const allusers
    //get al user in db,
    await User.find({}, (err, result) => {
        if (!err)
            allusers = result
    })
    for (var user in allusers) {
        console.log("current user = " + user)
        const waterDataPoint = new WaterDataPoint({
            id: user,
            date: new Date(),
            WashingMachine: Number(Math.random() * 100 + 1),
            ToiletFlush: Number(Math.random() * 100 + 1),
            Shower: Number(Math.random() * 100 + 1),
            Taps: Number(Math.random() * 100 + 1)
        })
        await waterDataPoint.save()

        const electricityDataPoint = new ElectricityDataPoint({
            id: user,
            date: new Date(),
            Aircon: Number(Math.random() * 100 + 1),
            Fridge: Number(Math.random() * 100 + 1),
            TV: Number(Math.random() * 100 + 1),
            WaterHeater: Number(Math.random() * 100 + 1),
            Misc: Number(Math.random() * 100 + 1)
        })
        await electricityDataPoint.save()
    }
}

let getRoundedDate = (minutes, d = new Date()) => {

    let ms = 1000 * 60 * minutes; // convert minutes to ms
    let roundedDate = new Date((Math.floor(d.getTime() / ms) + 1) * ms);

    return roundedDate
}

const createSchedule = () => {
    console.log("start of the first exeution @" + new Date())
    addDataPoint();
    setInterval(addDataPoint, interval10mins);
}

const scheduler = async () => {
    //calculatate time to next 10min mark
    var timeofNext10min = getRoundedDate()
        , timeNow = new Date().getTime()
        , offsetMillis = timeofNext10min - timeNow;


    //set timeout -> callback = a new function that execute now and set interval of 10mins
    setTimeout(createSchedule, offsetMillis);
}

module.exports = scheduler