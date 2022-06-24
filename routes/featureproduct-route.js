const express = require('express');
const {
    addColor,getAllColor,getColor,updateColor,deleteColor,

    addSize,getAllSizes,getSize,updateSize,deleteSize
} = require('../controllers/featuresController');

const router = express.Router();

router.post('/color',addColor);
router.get('/color',getAllColor);
router.get('/color/:id',getColor);
router.put('/color/:id',updateColor);
router.delete('/color/:id',deleteColor);


router.post('/size',addSize);
router.get('/size',getAllSizes);
router.get('/size/:id',getSize);
router.put('/size/:id',updateSize);
router.delete('/size/:id',deleteSize);


module.exports = {
    routes: router
}