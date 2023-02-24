
const connection=require('../configold/databaseconnect').con
const Users=require('../models/users')

var addUser=(req,resp)=>{
        data=req.body;
    Users.create(req.body,(err,results)=>{
     if(err){
      resp.send(err);
    }
    resp.status(200).json(results);
    })
         
}

// var  userList=(req,resp)=>{
// 	 Users.findAll(function(err,results){
//     if(err){
//       resp.send(err);
//     }
//     resp.json(results);
//    })
// }
var  userList=(req,resp)=>{
   Users.findAll((err,results)=>{
    if(err){
      resp.send(err);
    }
    resp.status(200).json(results);
   })
}

var userInfo=(req,resp)=>{

  Users.findById(req.params.id,(err,results)=>{
     if(err){
      resp.send(err);
    }
    resp.status(200).json(results);
  })
	
}

var userUpdate=(req,resp)=>{
	let data=req.body;
	 Users.update(req.params.id,data,(err,results)=>{
    if(err){
      resp.send(err);
    }
    resp.status(200).json(results);
   })
	
}

var userDelete=(req,resp)=>{
	 
	 Users.userdelete(req.params.id,(err,results)=>{
    if(err){
      resp.send(err);
    }
    resp.status(200).json(results);
   })
}


var userProfile=(req,resp)=>{
   console.log(req.file);
    resp.status(200).json({message:"Uploded",data:req.body});
}
module.exports={
    addUser,
    userList,
    userInfo,
    userUpdate,
    userDelete,
    userProfile
}