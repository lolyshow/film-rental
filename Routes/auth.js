const express = require("express");

const authroute = express.Router();

const registerController = require('../Controllers/RegisterUser');

authroute.post('/register',registerController.RegisterUser);

module.exports = authroute