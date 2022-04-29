const express = require('express');
const router = express.Router();
const ProductController = require('../Controllers/ProductController');
const auth = require("../middleware/Auth");
router.post('/createProduct',auth, ProductController.CreateProduct);
router.post('/getAllProducts',auth, ProductController.AllProducts);
router.post('/filterProducts',auth, ProductController.JoinProductsWithUser);
module.exports = router;