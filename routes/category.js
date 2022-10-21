const { query } = require('express');
const express=require('express');
const connection = require('../connection');
const router = express.Router();
//var auth = require('../services/authentication');
//var checkRole = require('../services/checkRole');

router.post('/add',(req,res)=>{
    let category = req.body;
    var query ="insert into category (category_name) values (?)";
    connection.query(query,[category.category_name],(err,results)=>{
        if(!err){
            return res.status(200).json({message:"Category added successfully"});
        }
        else{
            return res.status(500).json(err);
        }
    })
})

router.get('/get',(req,res)=>{
    var query = "select * from category order by category_name";
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }
        else{
            return res.status(500).json(err)
        }
    })
})

router.patch('/update',(req,res)=>{
    let product = req.body;
    var query ="update category set category_name=? where category_id=?";
    connection.query(query,[product.category_name, product.category_id],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message:"Category id does not found"});
            }
            return res.status(200).json({message:"Category updated successfully."});
        }
        else{
            return res.status(500).json(err);
        }
    })
})
 
module.exports = router;
