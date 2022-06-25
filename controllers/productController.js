'use strict'
const firebase = require('../db');
const Product = require('../models/product');
const fs = require('firebase-admin');
const firestore = fs.firestore();

//add product 
const addProduct= async(req, res,next) => {
    try{
        console.log('hello workd')
        const data = req.body;
        await firestore.collection('products').doc().set(data);
        res.send('Record saved successfuly');
    }catch (error){
        res.status(404).send(error.message);
    }
}
// add all product
const getAllProduct = async (req, res,next) => {
    try {
        const products = await firestore.collection('products').where('id',"==","2GJq1p8EfrfzhpUuacwX");
        const data = await products.get();
        const productArray = [];
        if(data.empty){
            res.status(404).send('No have product record found');
        }else{
            const allProduct = await data.docs.map((doc) =>({
                id : doc.id,
                ...doc.data()
        }))
           for(var i = 0 ; i < allProduct.length ; i++){
                var detail = await firestore.collection('detail_products').where('idProduct',"==",allProduct[i].id).get()
                var image = await firestore.collection('picture_product').where('idProduct',"==",allProduct[i].id).get()
                image = image.docs.map((doc)=>({
                   url : doc.data().url,
                   isFirst : doc.data().isFirst
                }))
                  if (detail.empty){
                    detail = []
                  }else{
                    detail = detail.docs.map((doc)=> ({
                       size : doc.data().size,
                       quantity : doc.data().quantity,
                      }));
                  }
                              
               productArray.push({product : allProduct[i],size : detail ,images : image})
            }

            res.status(200).json({data:productArray});
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
}
// get one product
const getProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await firestore.collection('products').doc(id);
        const data = await product.get();
        if(!data.exists){
            res.status(404).send('Product with the given Id not found');
        }else{
            res.send(data.data());
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
}
// update product
const updateProduct = async(req, res,next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const product = await firestore.collection('products').doc(id);
        await product.update(data);
        res.send('Product record update successfuly');
    } catch (error) {
        res.status(404).send(error.message);
    }
}
//delete product record
const deleteProduct = async (req, res,next) =>{
    try {
        const id = req.params.id;
        const product = await firestore.collection('products').doc(id).delete();
        res.send('Delete xong r ba noi');
    } catch (error) {
        res.status(404).send(error.message);
    }
}

module.exports = {
    addProduct,
    getAllProduct,
    getProduct,
    updateProduct,
    deleteProduct
}