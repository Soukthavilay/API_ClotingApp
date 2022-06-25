const express = require('express');
const {
    addUser, getAllUser,getUser,updateUser,deleteUser,signin,getMyInfo,verifyToken
       
} = require('../controllers/userController');

const router = express.Router();

router.post('/user',addUser);
router.post('/user/login',signin)
router.get('/user',verifyToken,getMyInfo);
router.get('/user/:id',getUser);
router.put('/user/:id',updateUser);
router.delete('/user/:id',deleteUser);


module.exports = {
    routes: router
}