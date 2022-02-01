const express = require('express');

const router = express.Router();

const homeController = require('../Controllers/index');

router.post('/home',homeController.start);

router.get('/tea', homeController.getAllTea);
router.post('/tea', homeController.newTea);
router.delete('/tea', homeController.deleteAllTea);

router.get('/tea/:name', homeController.getOneTea);
router.post('/tea/:name', homeController.newComment);
router.delete('/tea/:name', homeController.deleteOneTea);

module.exports = router;