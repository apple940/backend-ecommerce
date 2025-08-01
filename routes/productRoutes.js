const express = require('express');
const { addProducts, getProducts, deleteProduct, updateProduct } = require('../controllers/productControllers');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');



const router = express.Router()



router.post('/addProduct',authMiddleware,adminMiddleware,addProducts)
router.get('/getproduct',getProducts)
router.delete('/deleteproduct/:id',authMiddleware,adminMiddleware,deleteProduct)
router.put('/updateproduct/:id',authMiddleware,adminMiddleware,updateProduct)

module.exports = router;