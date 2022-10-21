const { query } = require('express');
const express=require('express');
const connection = require('../connection');
const router = express.Router();

router.post('/addCategoryVariations',(req,res)=>{
    let categoryVariations = req.body;
    var query ="insert into categoryVariations(category_id,sub_category_id,composition,width,length,height,thickness,unit_of_measurement,color,tpx_color_code,tpg_color_code,backing_cloth,built_material,design) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    connection.query(query,[categoryVariations.category_id, categoryVariations.sub_category_id,categoryVariations.composition,categoryVariations.width,categoryVariations.length,categoryVariations.height,categoryVariations.thickness, categoryVariations.unit_of_measurement,categoryVariations.color,categoryVariations.tpx_color_code,categoryVariations.tpg_color_code,categoryVariations.backing_cloth,categoryVariations.built_material,categoryVariations.design],(err,results)=>{
        if(!err){
            return res.status(200).json({message:"Category Variations added successfully"});
        }
        else{
            return res.status(500).json(err);
        }
    })
})

router.get('/getCategoryVariations',(req,res)=>{
    var query = "select v.composition,v.width,v.length,v.height,v.thickness,v.color,v.tpx_color_code,v.tpg_color_code,v.backing_cloth,v.built_material,v.design, c.category_name as category_name,s.sub_category_name as sub_category_name from categoryVariations as v INNER JOIN category as c on c.category_id = v.category_id INNER JOIN subCategory as s on s.sub_category_id = v.sub_category_id";
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

router.patch('/updateCategoryVariations',(req,res)=>{
    let categoryVariations = req.body;
    var query = "update categoryVariations  set  sub_category_id = ?,composition = ?, width = ? , length = ?, height = ?, thickness = ?, unit_of_measurement = ?, color = ?, tpx_color_code = ?, tpg_color_code = ?, backing_cloth = ?, built_material = ?, design = ?  where category_id = ?"
    //var query ="update categoryVariations set sub_category_name=?,category_id=? where sub_category_id=?";
    connection.query(query,[ categoryVariations.sub_category_id, categoryVariations.composition, categoryVariations.width,categoryVariations.length,categoryVariations.height,categoryVariations.thickness,categoryVariations.unit_of_measurement,categoryVariations.color,categoryVariations.tpx_color_code,categoryVariations.tpg_color_code,categoryVariations.backing_cloth,categoryVariations.built_material,categoryVariations.design,categoryVariations.category_id],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message:"Category Variations id does not found"});
            }
            return res.status(200).json({message:"Category Variations updated successfully."});
        }
        else{
            return res.status(500).json(err);
        }
    })
})


module.exports = router;
