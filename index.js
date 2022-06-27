'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');


// const addStudent = require('./routes/student-router');
// const studentRoutes = require('./routes/student-router');
const productRoutes = require('./routes/product-router');
const OrderRoutes = require('./routes/order-router');
const UserRoutes = require('./routes/user-routes');

const featuresRoutes = require('./routes/featureproduct-route');
const detailProduct = require('./routes/detailproduct-route')
const orderItem = require('./routes/order_item-route')
const categoryRoutes = require('./routes/category-router')
const app = express();
app.use(express.static(__dirname+ "/public/image"));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send('hello woorld')
})


app.use('/api',productRoutes.routes,categoryRoutes.routes);
app.use('/api/',OrderRoutes.routes);
app.use('/api/',UserRoutes.routes);
app.use('/api/',featuresRoutes.routes);
app.use('/api/',detailProduct.routes);
app.use('/api/',orderItem.routes);
app.listen(config.port,()=> console.log('App is listening on port : ' + config.port));
