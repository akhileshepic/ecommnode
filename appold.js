const express=require("express");
//add env
const env=require('dotenv').config()

const app=express();
const router=require("./routes/routes")
app.use("/user",router)
app.listen(process.env.PORT,(err)=>{
    if(err)
        throw err
    else
    console.log("server is running at port %d:",process.env.PORT);
})
