const express = require('express');
const router = express.Router();
const controller = require("../controllers/controller")

// controller.create_new_user

router.get('/register/:userID', controller.create_new_user)

router.get('/api/:userID', controller.find_user_info)

module.exports = router;