const{query} =require('express');
const express = require('express');
const connection = require('../connection');
const router = express.Router();

router.post('/addSubCategory',(req,res)=>{
    let subCategory = req.body;
    var query ="insert into subCategory (sub_category_name,category_id) values (?,?)";
    connection.query(query,[subCategory.sub_category_name,subCategory.category_id],(err,results)=>{
        if(!err){
            return res.status(200).json({message:"Sub Category added successfully"});
        }
        else{
            return res.status(500).json(err);
        }
    })
})


//
// create table subCategory(
//     sub_category_id int NOT NULL AUTO_INCREMENT,
//     sub_category_name varchar(255) NOT NULL,
//     category_id integer NOT NULL,
//     primary key(sub_category_id) ,
//     foreign key(category_id) references category(category_id)
//   );
// //  

router.get('/getSubCategories',(req,res)=>{
    var query = "select s.sub_category_id,s.sub_category_name,c.category_id as category_id, c.category_name as category_name from subCategory as s INNER JOIN category as c where s.category_id = c.category_id";
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }
        else{
            return res.status(500).json(err)
        }
    })
})

router.patch('/updateSubCategory',(req,res)=>{
    let product = req.body;
    var query ="update subCategory set sub_category_name=?,category_id=? where sub_category_id=?";
    connection.query(query,[product.sub_category_name, product.category_id, product.sub_category_id],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message:"Sub Category id does not found"});
            }
            return res.status(200).json({message:"Sub Category updated successfully."});
        }
        else{
            return res.status(500).json(err);
        }
    })
})
 
module.exports = router;