'use strict'
const firebase = require('../db');
const User = require('../models/user');
const fs = require('firebase-admin');
const bcrypt = require('bcrypt');
const firestore = fs.firestore();
const jwt = require('jsonwebtoken')
//add user
const addUser= async(req, res,next) => {
    try{
        const username = req.body.username;
        const users = await firestore.collection('users').where("username","==",username).get()
        if(!users.empty) return res.status(404).send('User already pls try again')
        const data = req.body;
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
        data.password  = hashedPassword;
        const user = await firestore.collection('users').doc().set(data);
        const r = await firestore.collection('users').where("username","==",username).get()
        .then((querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            return data[0]
        }
        )
        r.password = undefined   
       
        return res.status(200).json({user : r});
    }catch (error){
        return res.status(404).send(error.message);
    }
}
//sigin user
const signin = async(req, res) => {
    try {
        const username = req.body.username;
        const user = await firestore.collection('users').where("username","==",username).get()
        .then((querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
          if(data.length > 0)
          return data[0]
          else return []
        }
        )
        console.log("users",user)
       
        if(!(await bcrypt.compare(req.body.password,user.password))) return res.status(401).json({
            msg : "username or password is not valid"
        })
        user.password = undefined
        const token = await jwt.sign({
            user : user,   
            }, process.env.TOKEN_SECRET)

        
        res.status(200).json(token);
    } catch (error) {
        res.status(404).send(error.message); 
    }
}

const getMyInfo = async(req,res)=>{
    try{
        const userId = req.body.userId
        const users = await firestore.collection('users').doc(userId);
        const data = await users.get();
        if(!data.exists){
            res.status(404).send('User with the given Id not found');
        }else{
            const user = data.data()
            user.password = undefined
            res.send(user);
        }
        
    
    }catch(err){
        res.status(500).json({
            msg : err
        })
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
                const user = new User(
                    doc.id,
                    doc.data().username,
                    doc.data().address,
                    doc.data().password,
                    doc.data().role
                );
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
            res.send(data.data());
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
const verifyToken = (req,res,next)=>{
    const token = req.header('auth-token')
   
    if(!token){
        return res.status(403).json({
            msg : "token is not exist"
        })
    }
    try{
        const decode  = jwt.verify(token,process.env.TOKEN_SECRET)
        console.log('verify')
        req.body.userId = decode.user.id
    }catch(err){
        return res.status(501).json({
            msg : err
        })
    }
    return next()
}
module.exports = {
    addUser,
    getAllUser,
    getUser,
    updateUser,
    deleteUser,
    signin,
    verifyToken,
    getMyInfo
}

