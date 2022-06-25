const express = require('express');


const {
    addOrderItem,getAllOrderItem,getOrderItem,updateOrderItem,deleteOrderItem
} = require('../controllers/orderItemController');

const router = express.Router();

router.post('/orderitem',addOrderItem);
router.get('/orderitem',getAllOrderItem);
router.get('/orderitem/:id',getOrderItem);
router.put('/orderitem/:id',updateOrderItem);
router.delete('/orderitem/:id',deleteOrderItem);

module.exports = {
    routes: router
}