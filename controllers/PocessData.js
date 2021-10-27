const Query = require("../controllers/QueryController")

const processData = (data) => {
	// console.log(typeof (data.userData))
	// console.log(data.userData)
	// console.log(data.waterData)
	// console.log(data.electricityData)

	const currentDate = new Date(2021, 9, 1, 0, 0, 0, 0)
	var current_month = currentDate.getMonth()
	//var current_day = currentDate.getDate()
	var current_year = currentDate.getFullYear()
	// year, month, date, hrs, min, s, ms
	const point = new Date(current_year, current_month, 1, 0, 0, 0)

	var waterUsage = Number(0.0)

	for (var bleh in data.waterData) {

		if (data.waterData[bleh].date >= point) {
			waterUsage += data.waterData[bleh].washingMachine
			waterUsage += data.waterData[bleh].toiletFlush
			waterUsage += data.waterData[bleh].shower
			waterUsage += data.waterData[bleh].taps
		}
	}

	const electricitySupplier = data.userData.electricitySupplier;
	var eRate = 0.0
	switch (electricitySupplier) {
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
	for (const bleh in data.electricityData) {
		if (data.electricityData[bleh].date >= point) {
			electricityUsage += data.electricityData[bleh].aircon
			electricityUsage += data.electricityData[bleh].fridge
			electricityUsage += data.electricityData[bleh].tv
			electricityUsage += data.electricityData[bleh].waterHeater
			electricityUsage += data.electricityData[bleh].misc
		}
	}

	var waterCost = 2.74 * waterUsage / 1000
	var electricityCost = eRate * electricityUsage

	var waterRemaining
	if (data.userData.waterBudget == 0)
		waterRemaining = 0
	else
		waterRemaining = data.userData.waterBudget - waterUsage

	var electricityRemaining
	if (data.userData.electricityBudget == 0)
		electricityRemaining = 0
	else
		electricityRemaining = data.userData.electricityBudget - waterUsage

	console.log("Water usage this month: " + waterUsage)
	console.log("Water cost this month: " + waterCost)
	console.log("Electricity usage: " + electricityUsage)
	console.log("Electricity cost: " + electricityCost)
	console.log("Water remaining: " + waterRemaining + "Litres")
	console.log("Electricity remaining: " + electricityRemaining + "KWh")

	return ({
		waterUsage: waterUsage,
		waterCost: waterCost,
		electricityUsage: electricityUsage,
		electricityCost: electricityCost,
		waterRemaining: waterRemaining,
		electricityRemaining: electricityRemaining
	})
}


module.exports = processData
//module.exports = calculation















