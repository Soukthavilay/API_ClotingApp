'use strict'
const firebase = require('../db');
const DetailProduct = require('../models/detail_product');
const fs = require('firebase-admin');
const bcrypt = require('bcrypt');
const firestore = fs.firestore();

const addDetail= async(req, res,next) => {
    try{
        const data = req.body;
        await firestore.collection('detail_products').doc().set(data);
        res.send('Record saved successfuly');
    }catch (error){
        res.status(404).send(error.message);
    }
}

const getAllDetail = async(req, res,next) => {
    try {
        const detals = await firestore.collection('detail_products');
        const data = await detals.get();
        const detailArray = [];
        if(data.empty){
            res.status(404).send('No have order record found');
        }else{
            data.forEach(doc =>{
                const detail = new DetailProduct(
                    doc.id,
                    doc.data().idProduct,
                    doc.data().idColor,
                    doc.data().idSize,
                    doc.data().quantity,
                    doc.data().price,
                );
                detailArray.push(detail);
            });
            res.send(detailArray);
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
}

const getDetail = async (req, res, next) => {
    try {
        const id = req.params.id;
        const details = await firestore.collection('detail_products').doc(id);
        const data = await details.get();
        if(!data.exists){
            res.status(404).send('detailProduct with the given Id not found');
        }else{
            res.send(data.data());
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
}


const updateDetail = async(req, res,next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const details = await firestore.collection('detail_products').doc(id);
        await details.update(data);
        res.send('Details product record update successfuly');
    } catch (error) {
        res.status(404).send(error.message);
    }
}


const deleteDetail = async (req, res,next) =>{
    try {
        const id = req.params.id;
        const details = await firestore.collection('detail_products').doc(id).delete();
        res.send('Deleted');
    } catch (error) {
        res.status(404).send(error.message);
    }
}


module.exports = {
    addDetail,
    getDetail,
    getAllDetail,
    updateDetail,
    deleteDetail
}