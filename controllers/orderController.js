'use strict'
const firebase = require('../db');
const Order = require('../models/order');
//const Orderitem = require('../models/order_item');
const fs = require('firebase-admin');
const firestore = fs.firestore();

//add order
const addOrder= async(req, res,next) => {
    try{
        const {mobile,address,name,order_items,amount} = req.body;
        const data = {mobile,address,name,amount}
        order_items.forEach(async item=>{
          
           const p = await firestore.collection('detail_products').doc(item.detail_product_id).get()
           const product =   p.data()
           if(product.quantity < item.quantity) {return res.status(500).json({status : "error",msg : "item is out of stock" , stock : product.quantity})}
           item.realQuantity = product.quantity
        })
        data.status = 0;
        data.created_at = new Date(Date.now()).toDateString();
      
        const idOrder = await firestore.collection('orders').add(data).then((docRef) =>{
            return docRef.id
        });
        console.log('hello world',idOrder)
        order_items.forEach(async item=>{
            item.orderId = idOrder
            await firestore.collection('order_items').add(item)
            await firestore.collection('detail_products').doc(item.detail_product_id).update({quantity :item.realQuantity - item.quantity })

         })
        return res.send('Record saved successfuly');
    }catch (error){
        return res.status(404).send(error.message);
    }
}
// get all order
const getMyOrder = async(req, res,next) => {
    try {
        const orders = await firestore.collection('orders').where("userId","==",req.body.userId);
        const data = await orders.get();
        const ordersArray = [];
        if(data.empty){
            res.status(404).send('No have order record found');
        }else{
            data.forEach(async doc =>{
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
                var order_item = await firestore.collection('order_item').where('orderId',"==",order.id).get()
                order_item = order_item.docs.map((doc)=>({
                  id : doc.id,
                  ...doc.data()
                 }))
                ordersArray.push(order);
            });
            res.send(ordersArray);
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
}

// get on order
const getOrder = async (req, res, next) => {
    try {
        const id = req.params.id;
        const orders = await firestore.collection('orders').doc(id);
        const data = await orders.get();
        if(!data.exists){
            res.status(404).send('order with the given Id not found');
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

        const ordername = req.body.name;

        data.modified_at = new Date(Date.now()).toDateString();
        const orders = await firestore.collection('orders').doc(id);
        await orders.update(data);
        await firestore.collection('orders').doc().set(data);
        const r = await firestore.collection('orders').where("name","==",ordername).get()
        .then((querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            return data[0]
        }
        )   
        return res.status(200).json({order : r});
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
    getMyOrder,
    getOrder,
    updateOrder,
    deleteOrder


}



// get orderItem by OrderId
// get Order by userId

