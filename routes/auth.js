const router=require('express').Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()
const User=require("../models/User")
const CryptoJs=require("crypto-js");
var crypto = require('crypto');
const jwt=require("jsonwebtoken");
//REGISTER

router.post("/register",jsonParser,async (req,res)=>{
  
var mykey = crypto.createCipher('aes-128-cbc', 'mypassword');
var mystr = mykey.update(req.body.password, 'utf8', 'hex')
mystr += mykey.final('hex');
        const newUser=new User({
        username:req.body.username,
        email:req.body.email,
        password:mystr,
    });
  try{
    const savedUser = await newUser.save();
     res.status(201).json(savedUser);
  }catch(err){
    res.status(500).json(err);
  }
    
});


//LOGIN

router.post("/login",jsonParser, async (req,res)=>{
 try{
   
    const user=await User.findOne({username:req.body.username});
    
    !user && res.status(401).json("Wrong credentials");
    var mykey = crypto.createDecipher('aes-128-cbc', 'mypassword');
    var mystr = mykey.update(user.password, 'hex', 'utf8')
    mystr += mykey.final('utf8');
   const originalpassword=mystr;
 
    if(originalpassword !==req.body.password){
        res.status(401).json("Wrong credentials");
    }else{

        const accessToken=jwt.sign({
            id:user._id, 
            isAdmin:user.isAdmin
 
        },
        process.env.JWT_SEC,
        {expiresIn: '3d'}
        )
        const {password,...others}=user._doc;
        res.status(200).json({...others,accessToken});
    }
    

   

 }catch(err){
    res.status(500).json(err);
 }
});

module.exports=router; 