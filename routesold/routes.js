const express=require("express");

const router = express.Router();
var userctrl=require("../contollers/users")

const app=express();

// router.get("/",(req,res)=>{
//     res.send("hello");
// })
router.get("/add",userctrl.addUser)


module.exports=router;