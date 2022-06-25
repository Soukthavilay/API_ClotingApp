// Category and type
'use strict'
const firebase = require('../db');
const Size = require('../models/size');
const fs = require('firebase-admin');
const firestore = fs.firestore();

//Size
const addSize= async(req, res,next) => {
    try{
        const data = req.body;
        await firestore.collection('sizes').doc().set(data);
        res.send('Record saved successfuly');
    }catch (error){
        res.status(404).send(error.message);
    }
}

const getAllSizes = async (req, res,next) => {
    try {
        const sizes = await firestore.collection('sizes');
        const data = await sizes.get();
        const sizeArray = [];
        if(data.empty){
            res.status(404).send('No type record found');
        }else{
            data.forEach(doc =>{
                const size = new Size(
                    doc.id,
                    doc.data().description,
                );
                sizeArray.push(size);
            });
            res.send(sizeArray);
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
}

const getSize = async (req, res, next) => {
    try {
        const id = req.params.id;
        const size = await firestore.collection('sizes').doc(id);
        const data = await size.get();
        if(!data.exists){
            res.status(404).send('Size with the given Id not found');
        }else{
            res.send(data.data());
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
}


const updateSize = async(req, res,next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const size = await firestore.collection('sizes').doc(id);
        await size.update(data);
        res.send('size record update successfuly');
    } catch (error) {
        res.status(404).send(error.message);
    }
}


const deleteSize = async (req, res,next) =>{
    try {
        const id = req.params.id;
        const size = await firestore.collection('sizes').doc(id).delete();
        res.send('Deleted');
    } catch (error) {
        res.status(404).send(error.message);
    }
}

module.exports = {
    addSize,getAllSizes,getSize,updateSize,deleteSize
}