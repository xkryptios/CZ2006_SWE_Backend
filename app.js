const express = require("express")
const mongoose = require("mongoose")
require('dotenv').config()
const app = express();

mongoose.connect(process.env.URI)

app.get('/', function (req, res) {
    res.send('hello world')
})
app.listen(process.env.PORT || 3000, () => {
    console.log("server began at port 3000")
});
