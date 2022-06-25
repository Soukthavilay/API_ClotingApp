'use strict'
const firebase = require('../db');
const User = require('../models/user');
const fs = require('firebase-admin');
const bcrypt = require('bcrypt');
const firestore = fs.firestore();

//add user
const addUser= async(req, res,next) => {
    try{
        const username = req.body.username;
        const users = await firestore.collection('users').where("username","==",username).get()
        if(!users.empty) return res.status(404).send('User already pls try again')
        const data = req.body;
        await firestore.collection('users').doc().set(data);
        res.send(data.username + " " + " logged in");
    }catch (error){
        res.status(404).send(error.message);
    }
}
//sigin user
const signin = async(req, res,next) => {
    try {
        const username = req.body.username;
        const users = await firestore.collection('users').doc(username);
        const doc = await users.get();
    } catch (error) {
        res.status(404).send(error.message); 
    }
}
// get all user
const getAllUser = async(req, res,next) => {
    try {
        const users = await firestore.collection('users');
        const data = await users.get();
        const userArray = [];
        if(data.empty){
            res.status(404).send('No have order record found');
        }else{
            data.forEach(doc =>{
                console.log( doc.data().username)
                const user = new User(
                    doc.id,
                    doc.data().username,
                    doc.data().address,
                    doc.data().undefined,
                    doc.data().mobilePhone,
                    doc.data().role
                );
                console.log("user" + user.username)
                userArray.push(user);
            });
            res.send(userArray);
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
}
// get one user
const getUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const users = await firestore.collection('users').doc(id);
        const data = await users.get();
        if(!data.exists){
            res.status(404).send('User with the given Id not found');
        }else{
            res.send(
                data.data()   
            );
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
}
// update user
const updateUser = async(req, res,next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const users = await firestore.collection('users').doc(id);
        await users.update(data);
        res.send('Order record update successfuly');
    } catch (error) {
        res.status(404).send(error.message);
    }
}
// delete
const deleteUser = async (req, res,next) =>{
    try {
        const id = req.params.id;
        const users = await firestore.collection('users').doc(id).delete();
        res.send('Delete xong r ba noi');
    } catch (error) {
        res.status(404).send(error.message);
    }
}
module.exports = {
    addUser,
    getAllUser,
    getUser,
    updateUser,
    deleteUser,
    signin
}

