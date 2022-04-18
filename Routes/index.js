const express = require('express');

const router = express.Router();
require("dotenv").config({ path: `${__dirname}/.env` });
let secret = process.env.secret;
const homeController = require('../Controllers/index');
const auth = require("../middleware/Auth");
router.post('/homes',auth, homeController.start);

router.get('/tea', homeController.getAllTea);
router.post('/tea', homeController.newTea);
router.delete('/tea', homeController.deleteAllTea);

router.get('/tea/:name', homeController.getOneTea);
router.post('/tea/:name', homeController.newComment);
router.delete('/tea/:name', homeController.deleteOneTea);

module.exports = router;