'use strict'
const firebase = require('../db');
const Product = require('../models/product');
const fs = require('firebase-admin');
const firestore = fs.firestore();

//add product 
const addProduct= async(req, res,next) => {
    try{
        const product_name = req.body.nameProduct;
        const data = req.body;
        data.created_at = new Date(Date.now()).toDateString();
        await firestore.collection('products').doc().set(data);
        const r = await firestore.collection('products').where("nameProduct","==",product_name).get()
        .then((querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            return data[0]
        }
        )   
        return res.status(200).json({product : r});
    }catch (error){
        res.status(404).send(error.message);
    }
}
// add all product
const getAllProduct = async (req, res,next) => {
    try {
        const products =  firestore.collection('products')
       
        const data = await products.get();
       
        const productArray = [];
        if(data.empty){
            res.status(404).send('No have product record found');
        }else{
            for(const product of data.docs){
                const p = {
                    id : product.id,
                    ...product.data()
                }
                var detail = await firestore.collection('detail_products').where('idProduct',"==",p.id).get()
                var image = await firestore.collection('picture_product').where('idProduct',"==",p.id).limit(1).get()
                image = image.docs.map((doc)=>({
                   url : doc.data().url,
                //    isFirst : doc.data().isFirst
                }))[0]
                  if (detail.empty){
                    detail = []
                  }else{
                    detail = detail.docs.map((doc)=> ({
                       size : doc.data().size,
                       quantity : doc.data().quantity,
                      }));
                  }
                              
               productArray.push({product : p,size : detail ,images : image})
            }
        //     const allProduct =  data.docs.map((doc) =>({
        //         id : doc.id,
        //         ...doc.data()
        // }))
        // console.log(allProduct)
        //    for(var i = 0 ; i < allProduct.length ; i++){
        //         var detail = await firestore.collection('detail_products').where('idProduct',"==",allProduct[i].id).get()
        //         var image = await firestore.collection('picture_product').where('idProduct',"==",allProduct[i].id).limit(1).get()
        //         image = image.docs.map((doc)=>({
        //            url : doc.data().url,
        //         //    isFirst : doc.data().isFirst
        //         }))[0]
        //           if (detail.empty){
        //             detail = []
        //           }else{
        //             detail = detail.docs.map((doc)=> ({
        //                size : doc.data().size,
        //                quantity : doc.data().quantity,
        //               }));
        //           }
                              
        //        productArray.push({product : allProduct[i],size : detail ,images : image})
        //     }

            res.status(200).json({data:productArray});
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
}
// get one product
const getProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const product =  firestore.collection('products').doc(id);
        const data = await product.get();
        if(!data.exists){
            res.status(404).send('Product with the given Id not found');
        }else{
            const p = data.data();
            console.log(p)
            var detail = await firestore.collection('detail_products').where('idProduct',"==",id).get()
            var image = await firestore.collection('picture_product').where('idProduct',"==",id).get()
            image = image.docs.map((doc)=>({
                url : doc.data().url,
                isFirst : doc.data().isFirst
             }))
               if (detail.empty){
                 detail = []
               }else{
                 detail = detail.docs.map((doc)=> ({
                    id : doc.id,
                    size : doc.data().size,
                    quantity : doc.data().quantity,
                   }));
               }
           return res.status(200).json({product : p,size : detail ,images : image})
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
}
// update product
const updateProduct = async(req, res,next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const product_name = req.body.nameProduct;
        data.modified_at = new Date(Date.now()).toDateString();
        const product = await firestore.collection('products').doc(id);
        await product.update(data);
        await firestore.collection('products').doc().set(data);
        const r = await firestore.collection('products').where("nameProduct","==",product_name).get()
        .then((querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            return data[0]
        }
        )   
        return res.status(200).json({product : r});
    } catch (error) {
        res.status(404).send(error.message);
    }
}
//delete product record
const deleteProduct = async (req, res,next) =>{
    try {
        const id = req.params.id;
        const product = await firestore.collection('products').doc(id).delete();
        res.send('Delete xong r ba noi');
    } catch (error) {
        res.status(404).send(error.message);
    }
}

module.exports = {
    addProduct,
    getAllProduct,
    getProduct,
    updateProduct,
    deleteProduct
}