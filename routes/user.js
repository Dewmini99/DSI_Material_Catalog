const { query } = require('express');
const express = require('express');
const connection =require("../connection");
const router = express.Router();

router.post('/signup',(req,res) =>{
    let user = req.body;
    var query = "select email,password,role,status from user where email=?";
    connection.query(query,[user.email],(err,results)=>{
         if(!err){
            if(results.length <=0){
                var query = "insert into user(name,contactNumber,email,password,status,role) values(?,?,?,?,'false','user')";
                connection.query(query,[user.name,user.contactNumber,user.email,user.password],(err,results) =>{
                    if(!err){
                        return res.status(200).json({message:"Successfully Registered"});
                    }
                    else{
                        return res.status(500).json(err);
                    }
                })
            }

            else{
                return res.status(400).json({message: "Email already Exist" });
            }
         }
         else{
               return res.status(500).json(arr);
         }
    })
    
})

module.exports = router;