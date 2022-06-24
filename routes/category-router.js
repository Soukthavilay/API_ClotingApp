const express = require('express');


const {
    addCategory,getAllCategories,getCategory,updateCategory,deleteCategory,

    addType,getAllType,getType,updateType,deleteType
       
} = require('../controllers/categoryController');

const router = express.Router();

router.post('/category',addCategory);
router.get('/category',getAllCategories);
router.get('/category/:id',getCategory);
router.put('/category/:id',updateCategory);
router.delete('/category/:id',deleteCategory);


router.post('/type',addType);
router.get('/type',getAllType);
router.get('/type/:id',getType);
router.put('/type/:id',updateType);
router.delete('/type/:id',deleteType);




module.exports = {
    routes: router
}