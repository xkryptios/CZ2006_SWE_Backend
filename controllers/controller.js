const User = require('../models/userSchema');

//creation of a dummy user consumption data
// creat


// functions to create a new user in the users collection given ID
const create_new_user = (req, res) => {
    const userID = req.params.userID
    const user = new User({
        id: userID,
        waterData: [{
            datetime: "03-10-2021",
            consumption: 100
        }, {
            datetime: "02-10-2021",
            consumption: 90
        }
        ],
        electricityData: [{
            datetime: "03-10-2021",
            consumption: 100
        }, {
            datetime: "02-10-2021",
            consumption: 90
        }
        ]
    })
    user.save()
        .then((result) => {
            console.log("new user: " + userID + " has been added to collection")
            res.send(result)
        })
        .catch((err) => console.log(err))
}
// function to update new entry to a specific user in the collection

// function to retrieve all infomation about the user given the ID
const find_user_info = (req, res) => {
    User.find({ id: req.params.userID }, (err, user) => {
        if (err) {
            res.status(500).send(err)
            console.log(err)
        }
        else {
            res.status(200).send(user)
        }
    })
}

const findAll = (req, res) => {
    User.find({}, (err, user) => {
        res.send(user)
    })
}

// create a function to process the data retrived from the db
module.exports = {
    create_new_user,
    find_user_info,
    findAll
}