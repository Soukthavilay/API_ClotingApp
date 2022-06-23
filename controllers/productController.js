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
        const products = await firestore.collection('products');
        const data = await products.get();
        const productArray = [];
        if(data.empty){
            res.status(404).send('No have product record found');
        }else{
            data.forEach(doc =>{
                const product = new Product(
                    doc.id,
                    doc.data().nameProduct,
                    doc.data().descProduct,
                    doc.data().create_at,
                    doc.data().modified_at,
                    doc.data().categoryId
                );
                productArray.push(product);
            });
            res.send(productArray);
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