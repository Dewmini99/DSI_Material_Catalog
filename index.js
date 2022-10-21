const express = require('express');
var cors = require('cors');
const connection = require('./connection');
const categoryRoute = require('./routes/category');
const subCategoryRoute = require('./routes/subCategory');
const userRoute = require('./routes/user');
const productRoute = require('./routes/product');
const categoryVariationsRoute = require('./routes/categoryVariations')
const app = express();

app.use(cors());
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use('/category',categoryRoute);
app.use('/subCategory',subCategoryRoute)
app.use('/user',userRoute);
app.use('/product',productRoute);
app.use('/categoryVariations', categoryVariationsRoute);


module.exports = app;
