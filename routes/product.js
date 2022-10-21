const express = require('express');
const connection = require('../connection');
const router = express.Router();


router.post('/addProduct',(req,res)=>{
    let product = req.body;
    var query ="insert into product (product_name, category_id, sub_category_id, product_image,product_images,product_description,price,qty_in_stk,reach_compliance) values (?,?,?,?,?,?,?,?,?)";
    connection.query(query,[product.product_name,product.category_id,product.sub_category_id, product.product_image,product.product_images,product.product_description,product.price,product.qty_in_stk,product.reach_compliance ],(err,results)=>{
        if(!err){
            return res.status(200).json({message:"Product added successfully"});
        }
        else{
            return res.status(500).json(err);
        }
    })
})

router.get('/getProducts',(req,res)=>{
    var query = "select p.product_id,p.product_name,p.product_image,p.product_images,p.product_description,p.price,p.qty_in_stk,p.reach_compliance,c.category_name as category_name,s.sub_category_name as sub_category_name from product as p INNER JOIN category as c on p.category_id = c.category_id INNER JOIN subCategory as s on s.sub_category_id = p.sub_category_id";
    //var query = "select p.product_id,p.product_name,p.product_image,p.product_images,p.product_description,p.price,p.qty_in_stk,p.reach_compliance,c.category_id as category_id,c.category_name as category_name,s.sub_category_id as sub_category_id,s.sub_category_name as sub_category_name from product as p INNER JOIN category as c on p.category_id = c.category_id INNER JOIN subCategory as s on s.sub_category_id = p.sub_category_id";
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }
        else{
            return res.status(500).json(err);
        }
    })
})

router.get('/getByCategory/:id',(req,res)=>{
    const product_id = req.params.id;
    var query = "select product_id,product_name from product where product_id = ?;"
    connection.query(query,[product_id],(err,results) => {
        if(!err){
            return res.status(200).json(results);
        }
        else{
            return res.status(500).json(err);
        }
    })
})

router.get('/getById/:id',(req,res)=>{
    const product_id = req.params.id;
    var query = "select p.product_id,p.product_name,p.product_image,p.product_images,p.product_description,p.price,p.qty_in_stk,p.reach_compliance,c.category_id as category_id,c.category_name as category_name,s.sub_category_id as sub_category_id,s.sub_category_name as sub_category_name from product as p INNER JOIN category as c on p.category_id = c.category_id INNER JOIN subCategory as s on s.sub_category_id = p.sub_category_id where product_id = ?";
    //var query = "select product_id,product_name, category_id, sub_category_id, product_image, product_images,product_description, price, qty_in_stk, reach_compliance from product where category_id = ?;"
    connection.query(query,[product_id],(err,results) => {
        if(!err){
            return res.status(200).json(results[0]);
        }
        else{
            return res.status(500).json(err);
        }
    })
})


router.patch('/updateProduct', (req,res)=>{
    let product = req.body;
    var query = "update product set product_name = ?, product_image = ?, product_images = ?, product_description = ?, price =?, qty_in_stk = ?, reach_compliance =?, category_id=? , sub_category_id = ? where product_id = ?";
    //var query = "update product set p.product_name = ?,p.product_image =?,p.product_images =?,p.product_description=?,p.price = ?,p.qty_in_stk = ?,p.reach_compliance = ?,c.category_id = ? , s.sub_category_id = ?  from product as p INNER JOIN category as c on p.category_id = c.category_id INNER JOIN subCategory as s on s.sub_category_id = p.sub_category_id where p.product_id = ?";
    connection.query(query,[product.product_name, product.product_image, product.product_images, product.product_description, product.price, product.qty_in_stk, product.reach_compliance,product.category_id,product.sub_category_id,product.product_id],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message:"Product id does not found"});
            }
            return res.status(200).json({message:"Product updated successfully."});
        }
        else{
            return res.status(500).json(err);
        }    
    })
})

router.delete('/deleteProduct/:id',(req,res) => {
    const product_id = req.params.id;
    var query = "delete from product where product_id = ?";
    connection.query(query,[product_id],(err,results) =>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message:"Product id does not found"});
            }
            return res.status(200).json({message:"Product Deleted Successfully"});

        }else{
            return res.status(500).json(err);
        }
    })
})


module.exports = router;