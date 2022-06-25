'use strict'
const firebase = require('../db');
const OrderItem = require('../models/order_item');
const fs = require('firebase-admin');
const bcrypt = require('bcrypt');
const firestore = fs.firestore();
const addOrderItem= async(req, res,next) => {
    try{
        const detailProductId =  req.body.detailProductId;
        const quantitySold = req.body.quantity;



        const detailProduct = await firestore.collection('detail_products').doc(detailProductId).get()
        const detailProductdata = detailProduct.data();
        
        

        const product = await firestore.collection('products').doc(detailProductdata.idProduct).get()
        const priceProduct = product.data().price
        const quantityProduct = detailProductdata.quantity
       
        if(quantityProduct < quantitySold){
            res.status(404).send('There are not enough items to sell');
        }else{
            const data = req.body;

            data.price = parseFloat(priceProduct) * parseFloat (quantityProduct);
            console.log("price",data.price);

            await firestore.collection('detail_products').doc().set(data);


            const quantityPrd = parseInt(quantityProduct) - parseInt (quantitySold);
            console.log(quantityPrd);

            await firestore.collection('detail_products').doc(detailProductId).update({quantity:quantityPrd});
            return res.status(200).json("add success");
        }
    }catch (error){
        res.status(404).send(error.message);
    }
}




const getAllOrderItem = async(req, res,next) => {
    try {
        const OrderItems = await firestore.collection('order_items');
        const data = await OrderItems.get();
        const orderItemArray = [];
        if(data.empty){
            res.status(404).send('No have order record found');
        }else{
            data.forEach(doc =>{
                const order_item = new OrderItem(
                    doc.id,
                    doc.data().orderId,
                    doc.data().productId,
                    doc.data().quantity,
                    doc.data().price
                );
                orderItemArray.push(order_item);
            });
            res.send(orderItemArray);
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
}

const getOrderItem = async (req, res, next) => {
    try {
        const id = req.params.id;
        const orderItems = await firestore.collection('order_items').doc(id);
        const data = await orderItems.get();
        if(!data.exists){
            res.status(404).send('Order Items with the given Id not found');
        }else{
            res.send(data.data());
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
}

const updateOrderItem = async(req, res,next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const orderItems = await firestore.collection('order_items').doc(id);
        await orderItems.update(data);
        res.send('Order Item product record update successfuly');
    } catch (error) {
        res.status(404).send(error.message);
    }
}

const deleteOrderItem = async (req, res,next) =>{
    try {
        const id = req.params.id;
         await firestore.collection('order_items').doc(id).delete();
        res.send('Deleted');
    } catch (error) {
        res.status(404).send(error.message);
    }
}


module.exports = {
   addOrderItem,
   getOrderItem,
   getAllOrderItem,
    updateOrderItem,
    deleteOrderItem
}

