const express = require("express")
const mongoose = require("mongoose")
const router = require("./routes/router")
require('dotenv').config()
const app = express();


mongoose.connect(process.env.URI,
    {
        useNewUrlParser: true,
        // useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then((results) => console.log("connected to the db"))
    .catch((err) => console.log(err))


//redirect the request to the router
app.use('/', router)

app.listen(process.env.PORT || 3000, () => {
    console.log("server began at port 3000")
});
