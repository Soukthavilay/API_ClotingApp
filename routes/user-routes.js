const express = require('express');
const {
    addUser, getAllUser,getUser,updateUser,deleteUser,signin
       
} = require('../controllers/userController');

const router = express.Router();

router.post('/user',addUser);
router.get('/user',getAllUser);
router.get('/user/:id',getUser);
router.put('/user/:id',updateUser);
router.delete('/user/:id',deleteUser);
router.post('/user',signin)

module.exports = {
    routes: router
}