// Category and type
'use strict'
const firebase = require('../db');
const Category = require('../models/category');
const Type = require('../models/type');
const fs = require('firebase-admin');
const firestore = fs.firestore();


//Category
const addCategory= async(req, res,next) => {
    try{
        console.log('add')
        const data = req.body;
        await firestore.collection('categories').doc().set(data);
        res.send('Record saved successfuly');
    }catch (error){
        res.status(404).send(error.message);
    }
}


const getAllCategories = async (req, res,next) => {
    try {
        const categories = await firestore.collection('categories');
        const data = await categories.get();
        const categorieArray = [];
        if(data.empty){
            res.status(404).send('No record found');
        }else{
            data.forEach(doc =>{
                const category = new Category(
                    doc.id,
                    doc.data().tittle,
                    doc.data().typeId
                );
                categorieArray.push(category);
            });
            res.send(categorieArray);
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
}


const getCategory = async (req, res, next) => {
    try {
        const id = req.params.id;
        const category = await firestore.collection('categories').doc(id);
        const data = await category.get();
        if(!data.exists){
            res.status(404).send('category with the given Id not found');
        }else{
            res.send(data.data());
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
}

const updateCategory = async(req, res,next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const category = await firestore.collection('categories').doc(id);
        await category.update(data);
        res.send('category record update successfuly');
    } catch (error) {
        res.status(404).send(error.message);
    }
}

const deleteCategory = async (req, res,next) =>{
    try {
        const id = req.params.id;
        const category = await firestore.collection('categories').doc(id).delete();
        res.send('record was deleted');
    } catch (error) {
        res.status(404).send(error.message);
    }
}



//Type
const addType= async(req, res,next) => {
    try{
        const data = req.body;
        await firestore.collection('types').doc().set(data);
        res.send('Record saved successfuly');
    }catch (error){
        res.status(404).send(error.message);
    }
}


const getAllType = async (req, res,next) => {
    try {
        const types = await firestore.collection('types');
        const data = await types.get();
        const typeArray = [];
        if(data.empty){
            res.status(404).send('No type record found');
        }else{
            data.forEach(doc =>{
                const type = new Type(
                    doc.id,
                    doc.data().tittle,
                );
                typeArray.push(type);
            });
            res.send(typeArray);
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
}


const getType = async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await firestore.collection('types').doc(id);
        const data = await product.get();
        if(!data.exists){
            res.status(404).send('Type with the given Id not found');
        }else{
            res.send(data.data());
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
}


const updateType = async(req, res,next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const type = await firestore.collection('types').doc(id);
        await type.update(data);
        res.send('type record update successfuly');
    } catch (error) {
        res.status(404).send(error.message);
    }
}


const deleteType = async (req, res,next) =>{
    try {
        const id = req.params.id;
        const type = await firestore.collection('types').doc(id).delete();
        res.send('Deleted');
    } catch (error) {
        res.status(404).send(error.message);
    }
}

module.exports = {
    addCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory,

    addType,getAllType,getType, updateType, deleteType
}