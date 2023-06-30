const express = require('express');
const router = express.Router();
const { addOrUpdateUser } = require('../controllers/UserController');

// @desc   Adds new user if it doesnt exist and returns newly created user, 
//         otherwise return existing user from database
// @route  PUT /users
// @access Public
router.put("/", addOrUpdateUser);

module.exports = router;
