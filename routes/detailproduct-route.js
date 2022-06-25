const express = require('express');
const {
   addDetail,getAllDetail,getDetail,updateDetail,deleteDetail
} = require('../controllers/detailProductController');

const router = express.Router();

router.post('/detailproduct',addDetail);
router.get('/detailproduct',getAllDetail);
router.get('/detailproduct/:id',getDetail);
router.put('/detailproduct/:id',updateDetail);
router.delete('/detailproduct/:id',deleteDetail);




module.exports = {
    routes: router
}