const express = require('express');
const {
    addSize,getAllSizes,getSize,updateSize,deleteSize
} = require('../controllers/featuresController');

const router = express.Router();

router.post('/size',addSize);
router.get('/size',getAllSizes);
router.get('/size/:id',getSize);
router.put('/size/:id',updateSize);
router.delete('/size/:id',deleteSize);


module.exports = {
    routes: router
}