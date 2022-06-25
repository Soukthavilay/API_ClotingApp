const express = require('express');
const {
   addProduct,
   getAllProduct,
   getProduct,
   updateProduct,
   deleteProduct
       
} = require('../controllers/productController');
const uploadImage = require("../middlewares/uploadImage")
const multer = require('multer')
const uploadImageControll = require('../controllers/pictureController')

const router = express.Router();
const upload = multer({
    storage: multer.memoryStorage()
})
router.post('/product/image',uploadImage.single('file'),uploadImageControll)
router.post('/product',addProduct);
router.get('/product',getAllProduct);
router.get('/product/:id',getProduct);
router.put('/product/:id',updateProduct);
router.delete('/product/:id',deleteProduct);

module.exports = {
    routes: router
}