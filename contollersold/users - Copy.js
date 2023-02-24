const express=require("express");
const mysql=require("mysql")
const connection=require('../config/databaseconnect').con
var addUser=(req,resp)=>{

connection.query("SELECT COUNT(*) AS email FROM test WHERE emailid = ? " , 
req.body.emailid , function(err , data){
   if(err){
       console.log(err);
   }   
   else{
       if(data[0].email > 0){  
             resp.status(409).json({
	      		    message:"alredy exits",
	      	});
       }else{
           let sqlQuery=connection.query("Insert INTO test Set  ?",[req.body],function(error,results,filed){
     
               if(err){
                  throw error;
               }else{
                  resp.status(200).json({
	      		    message:"added",
	      	        lastID:results.insertId,
	              });
               }
           })                  
       }
   }
})

         
}

var  userList=(req,resp)=>{
	 let sqlQuery="Select * from test";
     connection.query(sqlQuery,function(error,results,filed){
	     if(error) throw error;
	      resp.status(200).json(results);
	     });
}

var userInfo=(req,resp)=>{
	let sqlQuery="Select * from test WHERE id=?";
     connection.query(sqlQuery,[req.params.id],function(error,results,filed){
	     if(error) throw error;
	      resp.status(200).json(results);
	     });
}

var userUpdate=(req,resp)=>{
	let data=req.body;
	 
	let sqlQuery=connection.query("Update test Set username=?,phoneno=?,emailid=?,gender=? where id=?",[data.username,data.phoneno,data.emailid,data.gender,req.params.id],function(error,results,filed){
        if(error) throw error;
	      resp.status(200).json({message:"Update"});
	     });
}

var userDelete=(req,resp)=>{
	 
	let sqlQuery=connection.query("DELETE FROM test WHERE  id=?",[req.params.id],function(error,results,filed){
        if(error) throw error;
	      resp.status(200).json({message:"Delete"});
	     });
}

module.exports={
    addUser,
    userList,
    userInfo,
    userUpdate,
    userDelete
}