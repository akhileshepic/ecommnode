const router=require('express').Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const User=require("../models/User")
var crypto = require('crypto');
const {verifyToken,verifyTokenAndAuthorization}=require('./verifyToken')
router.put("/:id",jsonParser,verifyTokenAndAuthorization,async (req,res)=>{
    if(req.body.password){
        var mykey = crypto.createCipher('aes-128-cbc', 'mypassword');
        var mystr = mykey.update(req.body.password, 'utf8', 'hex')
        mystr += mykey.final('hex');
         
        req.body.password=mystr;
     
    }

    try{
       const updateUser =await User.findByIdAndUpdate(req.params.id,{
        $set:req.body
       },{new:true})
       res.status(200).json(updateUser);
    }catch(err){
        res.json(err);
    }
});

router.post("/test",jsonParser,(req,res)=>{
    res.send(req.body)
})
module.exports=router; 