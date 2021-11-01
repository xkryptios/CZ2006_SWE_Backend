const Query = require("../controllers/QueryController")

const processData = (data) => {
	const currentDate = new Date(2021, 9, 1, 0, 0, 0, 0)
	var current_month = currentDate.getMonth()
	//var current_day = currentDate.getDate()
	var current_year = currentDate.getFullYear()
	// year, month, date, hrs, min, s, ms
	const point = new Date(current_year, current_month, 1, 0, 0, 0)

	var waterUsage = Number(0.0)

	for (let value in data.waterData) {
		if (data.waterData[value].date >= point) {
			waterUsage += data.waterData[value].washingMachine
			waterUsage += data.waterData[value].toiletFlush
			waterUsage += data.waterData[value].shower
			waterUsage += data.waterData[value].taps
		}
	}
	console.log("water used: " + waterUsage)
	// console.log("water remain: " + waterRemaining)
	// console.log("water used: " + waterUsage)



	//calculate electricity consumption in in current month
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

	var electricityUsage = Number(0.0)
	// console.log(data.electricityData)
	for (let value in data.electricityData) {
		if (data.electricityData[value].date >= point) {
			electricityUsage += data.electricityData[value].aircon
			electricityUsage += data.electricityData[value].fridge
			electricityUsage += data.electricityData[value].tv
			electricityUsage += data.electricityData[value].waterHeater
			electricityUsage += data.electricityData[value].misc
		}
	}


	//calculate cost of water consumption in current month
	var waterCost = 0.00121 * waterUsage
	var electricityCost = eRate * electricityUsage
	var waterRemaining
	if (data.userData.waterBudget == 0)
		waterRemaining = 0
	else
		waterRemaining = data.userData.waterBudget - waterUsage

	var electricityRemaining
	if (data.userData.electricityBudget == 0) {
		electricityRemaining = 0

	}
	else {
		electricityRemaining = data.userData.electricityBudget - electricityUsage
	}



	//start restructuring data

	//starting off with monthly data
	let currentmonthwater = []
	let monthlywater = []
	let currentmonthelectricity = []
	let monthlyelectricity = []
	for (let item of data.waterData) {
		if (item.date >= currentDate)
			currentmonthwater.push(item)
		else

			monthlywater.push({
				date: item.date,
				washingMachine: item.washingMachine,
				toiletFlush: item.toiletFlush,
				shower: item.shower,
				taps: item.taps
			})
	}
	octmonthwaterdata = {
		date: currentDate,
		washingMachine: Number(0.0),
		toiletFlush: Number(0.0),
		shower: Number(0.0),
		taps: Number(0.0)
	}
	for (let item of currentmonthwater) {
		octmonthwaterdata.washingMachine += item.washingMachine
		octmonthwaterdata.toiletFlush += item.toiletFlush
		octmonthwaterdata.shower += item.shower
		octmonthwaterdata.taps += item.taps
	}
	monthlywater.unshift(octmonthwaterdata)
	monthlywater.reverse()
	monthlywater.shift()

	for (let item of data.electricityData) {
		if (item.date >= currentDate)
			currentmonthelectricity.push(item)
		else
			monthlyelectricity.push({
				date: item.date,
				aircon: item.aircon,
				fridge: item.fridge,
				tv: item.tv,
				waterHeater: item.waterHeater,
				misc: item.misc
			})
	}
	octmonthelectricitydata = {
		date: currentDate,
		aircon: Number(0.0),
		fridge: Number(0.0),
		tv: Number(0.0),
		waterHeater: Number(0.0),
		misc: Number(0.0)
	}
	for (let item of currentmonthelectricity) {
		octmonthelectricitydata.aircon += item.aircon
		octmonthelectricitydata.fridge += item.fridge
		octmonthelectricitydata.tv += item.tv
		octmonthelectricitydata.waterHeater += item.waterHeater
		octmonthelectricitydata.misc += item.misc
	}
	monthlyelectricity.unshift(octmonthelectricitydata)
	monthlyelectricity.reverse()
	monthlyelectricity.shift()
	//

	let sortedWater = currentmonthwater.slice().sort((a, b) => b.date - a.date)
	let sortedElectricity = currentmonthelectricity.slice().sort((a, b) => b.date - a.date)

	const hourlywaterPreprocess = sortedWater.slice(0, 24)
	let hourlywater = []
	hourlywaterPreprocess.forEach((item) => {
		hourlywater.push({
			date: item.date,
			washingMachine: item.washingMachine,
			toiletFlush: item.toiletFlush,
			shower: item.shower,
			taps: item.taps
		})
	})


	const hourlyelectricityPreprocess = sortedElectricity.slice(0, 24)
	let hourlyelectricity = []
	hourlyelectricityPreprocess.forEach((item) => {
		hourlyelectricity.push({
			date: item.date,
			aircon: item.aircon,
			fridge: item.fridge,
			tv: item.tv,
			waterHeater: item.waterHeater,
			misc: item.misc
		})
	})


	let dailywater = []
	let dailyelectricity = []

	for (let i = 1; i <= 14; i++) {
		let tempwaterstruct = {
			date: new Date(2021, 09, i, 0, 0, 0, 0),
			washingMachine: Number(0.0),
			toiletFlush: Number(0.0),
			shower: Number(0.0),
			taps: Number(0.0),
		}
		let tempelectricitystruct = {
			date: new Date(2021, 09, i, 0, 0, 0, 0),
			aircon: Number(0.0),
			fridge: Number(0.0),
			tv: Number(0.0),
			waterHeater: Number(0.0),
			misc: Number(0.0)
		}
		for (let j = 0; j < 24; j++) {
			const temp = sortedWater.pop()
			tempwaterstruct.washingMachine += temp.washingMachine
			tempwaterstruct.toiletFlush += temp.toiletFlush
			tempwaterstruct.shower += temp.shower
			tempwaterstruct.taps += temp.taps

			const temp2 = sortedElectricity.pop()
			tempelectricitystruct.aircon += temp2.aircon
			tempelectricitystruct.fridge += temp2.fridge
			tempelectricitystruct.tv += temp2.tv
			tempelectricitystruct.waterHeater += temp2.waterHeater
			tempelectricitystruct.misc += temp2.misc


		}
		dailywater.push(tempwaterstruct)
		dailyelectricity.push(tempelectricitystruct)
	}





	// console.log("Water usage this month: " + waterUsage)
	// console.log("Water cost this month: " + waterCost)
	// console.log("Electricity usage: " + electricityUsage)
	// console.log("Electricity cost: " + electricityCost)
	// console.log("Water remaining: " + waterRemaining + "Litres")
	// console.log("Electricity remaining: " + electricityRemaining + "KWh")

	hourlyelectricity.reverse()
	hourlywater.reverse()


	//convert all date to its respective values for display on frontend

	monthlywater.forEach((item) => {
		item.date = item.date.getMonth() + 1
	})
	monthlyelectricity.forEach((item) => {
		item.date = item.date.getMonth() + 1
	})
	dailywater.forEach((item) => {
		item.date = item.date.getDate()
	})
	dailyelectricity.forEach((item) => {
		item.date = item.date.getDate()
	})
	hourlywater.forEach((item) => {
		item.date = item.date.getHours()
	})
	hourlyelectricity.forEach((item) => {
		item.date = item.date.getHours()
	})

	// monthlyelectricity.forEach((item) => {
	// 	console.log(item.date + item.aircon)
	// })
	// console.log(hourlyelectricity)


	return_object = {
		userdata: data.userData,
		monthlyWater: monthlywater,
		dailyWater: dailywater,
		hourlyWater: hourlywater,
		monthlyElectricity: monthlyelectricity,
		dailyElectricity: dailyelectricity,
		hourlyElectricity: hourlyelectricity,
		summary: {
			waterUsage: waterUsage,
			waterCost: waterCost,
			electricityUsage: electricityUsage,
			electricityCost: electricityCost,
			waterRemaining: waterRemaining,
			electricityRemaining: electricityRemaining
		}
	}

	return (return_object)
}



module.exports = processData
//module.exports = calculation















