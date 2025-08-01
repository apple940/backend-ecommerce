const express = require('express');
const { addToCart, getCart, removeFromCart } = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');



//router
const router = express.Router();



router.post('/addcart',authMiddleware,addToCart)
router.get('/',authMiddleware,getCart)
router.post('/removecart',authMiddleware,removeFromCart)


module.exports = router;