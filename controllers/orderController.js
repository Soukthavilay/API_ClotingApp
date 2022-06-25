'use strict'
const firebase = require('../db');
const Order = require('../models/order');
const fs = require('firebase-admin');
const firestore = fs.firestore();

//add order
const addOrder= async(req, res,next) => {
    try{
        const data = req.body;
        await firestore.collection('orders').doc().set(data);
        res.send('Record saved successfuly');
    }catch (error){
        res.status(404).send(error.message);
    }
}
// get all order
const getAllOrder = async(req, res,next) => {
    try {
        const orders = await firestore.collection('orders');
        const data = await orders.get();
        const ordersArray = [];
        if(data.empty){
            res.status(404).send('No have order record found');
        }else{
            data.forEach(doc =>{
                const order = new Order(
                    doc.id,
                    doc.data().created_at,
                    doc.data().modified_at,
                    doc.data().amount,
                    doc.data().status,
                    doc.data().name,
                    doc.data().address,
                    doc.data().userId,
                    doc.data().mobile
                );
          // get orderItem by OrderId
          //      ordersArray.pust({order : order, orderItem : orderItem })
                ordersArray.push(order);
            });
            res.send(ordersArray);
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
}
// get order
const getOrder = async (req, res, next) => {
    try {
        const id = req.params.id;
        const orders = await firestore.collection('orders').doc(id);
        const data = await orders.get();
        if(!data.exists){
            res.status(404).send('Product with the given Id not found');
        }else{
            res.send(data.data());
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
}
// update 
const updateOrder = async(req, res,next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const orders = await firestore.collection('orders').doc(id);
        await orders.update(data);
        res.send('Order record update successfuly');
    } catch (error) {
        res.status(404).send(error.message);
    }
}
// delete
const deleteOrder = async (req, res,next) =>{
    try {
        const id = req.params.id;
        const orders = await firestore.collection('orders').doc(id).delete();
        res.send('Delete xong r ba noi');
    } catch (error) {
        res.status(404).send(error.message);
    }
}
module.exports ={
    addOrder,
    getAllOrder,
    getOrder,
    updateOrder,
    deleteOrder

}

// get orderItem by OrderId
// get Order by userId