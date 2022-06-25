const express = require('express');
const {
    addOrder, getMyOrder, getOrder, updateOrder, deleteOrder
       
} = require('../controllers/orderController');
const { verifyToken } = require('../controllers/userController');


const router = express.Router();

router.post('/order',verifyToken,addOrder);
router.get('/order',verifyToken,getMyOrder);
router.get('/order/:id',getOrder);
router.put('/order/:id',updateOrder);
router.delete('/order/:id',deleteOrder);

module.exports = {
    routes: router
}