const express = require('express');
const {
    addOrder, getMyOrder, getOrder, updateOrder, deleteOrder
       
} = require('../controllers/orderController');


const router = express.Router();

router.post('/order',addOrder);
router.get('/order',getMyOrder);
router.get('/order/:id',getOrder);
router.put('/order/:id',updateOrder);
router.delete('/order/:id',deleteOrder);

module.exports = {
    routes: router
}