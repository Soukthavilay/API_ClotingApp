const express = require('express');
const {
    addOrder, getAllOrder, getOrder, updateOrder, deleteOrder
       
} = require('../controllers/orderController');


const router = express.Router();

router.post('/order',addOrder);
router.get('/order',getAllOrder);
router.get('/order/:id',getOrder);
router.put('/order/:id',updateOrder);
router.delete('/order/:id',deleteOrder);

module.exports = {
    routes: router
}