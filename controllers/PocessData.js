

const Query = require("../controllers/QueryController")

const processData = (data) => {
	
    console.log(data.userData)
    console.log(data.waterData)
    console.log(data.electricityData)
	// ^ to comment out.
	
	const currentDate = new Date()
	var current_month = currentDate.getMonth()
	//var current_day = currentDate.getDate()
	var current_year = currentDate.getFullYear()
	// year, month, date, hrs, min, s, ms
	const point = new Date(current_year, current_month, 1, 0, 0, 0)
	
	var waterUsage = Number(0.0)
	
	for(var bleh in data.waterData){
		/*
		console.log(typeof data.waterData[bleh].date)
		console.log(data.waterData[bleh].date)
		console.log(typeof point)
		console.log(point)
		*/
		if(data.waterData[bleh].date >= point){	
			waterUsage += data.waterData[bleh].WashingMachine
			waterUsage += data.waterData[bleh].ToiletFlush
			waterUsage += data.waterData[bleh].Shower
			waterUsage += data.waterData[bleh].Taps
		
		}
			/*
			waterUsage += data.waterData.WashingMachine
			waterUsage += data.waterData.ToiletFlush
			waterUsage += data.waterData.Shower
			waterUsage += data.waterData.Taps
		*/
	}
	
	const electricitySupplier = data.userData.electricitySupplier;
	var eRate = 0.0
	switch (electricitySupplier){
		case 'SupplierX':
			eRate = 0.258
			break
		case 'SupplierY':
			eRate = 0.28
			break
		case 'SupplierZ':
			eRate = 0.3
			break
		default:
			//user didn't input electricitySupplier..
			eRate = 1.0;
	}
	
	var electricityUsage = 0.0
	for(const bleh in data.electricityData){
		if(data.electricityData[bleh].date >= point){
			electricityUsage += data.electricityData[bleh].Aircon
			electricityUsage += data.electricityData[bleh].Fridge
			electricityUsage += data.electricityData[bleh].TV
			electricityUsage += data.electricityData[bleh].WaterHeater
			electricityUsage += data.electricityData[bleh].Misc
		}
	}
	
	var waterCost = 2.74 * waterUsage/1000
	var electricityCost = eRate * electricityUsage
	
	var waterRemaining = data.userData.waterBudget - waterUsage
	var electricityRemaining = data.userData.electricityBudget - electricityUsage
	
	console.log("Water usage this month: " + waterUsage)
	console.log("Water cost this month: " + waterCost)
	console.log("Electricity usage: " + electricityUsage)
	console.log("Electricity cost: " + electricityCost)
	console.log("Water remaining: " + waterRemaining + "Litres")
	console.log("Electricity remaining: " + electricityRemaining + "KWh")
	
	
	
	
	
//}

//const calculation = (data) => {
/*
	const info = Query.find_user_info_dated
	//water usage this month
	var waterUsage = 0.0
	for(const bleh in info.waterData){
		//waterUsage += info.waterData.WashingMachine
		waterUsage += info.waterData[bleh].WashingMachine
	}
	//a lof of obj inside objs.... Slowly go figure out which is the numeric value itself.
	
	//only one water supplier
	//water cost
	var waterCost = 2.74 * waterUsage/1000
	
	
	//electricity usage this month
	var electricityUsage = 0.0
	for(const bleh in info){
		electricityUsage += info.electricityData
	}
	var electricityCost = eRate * electricityUsage
	
	console.log(waterUsage)
    console.log(waterCost)
    console.log(electricityUsage)
    console.log(electricityCost)
	
	// return result
	return {waterUsage:waterUsage, waterCost:waterCost,
	electricityUsage:electricityUsage, electricityCost:electricityCost}
	*/
}


module.exports = processData
//module.exports = calculation















