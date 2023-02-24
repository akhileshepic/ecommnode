const express=require("express");
const app=express();
const mongoose=require("mongoose");
mongoose.set('strictQuery', true);
const bodyParser = require('body-parser');
const dotenv=require("dotenv");
const userRouter=require("./routes/user");
const authRouter=require("./routes/auth");
const checkRouter=require("./routes/check");
const multer = require("multer");
var upload = multer()
app.use(express.json());
app.use(upload.array())
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(()=>
console.log("DB Successfull connect ")).catch((err)=>{
console.log(err);
});
app.use("/api/auth",authRouter);
app.use("/api/users",userRouter);
 

app.use("/api/check",checkRouter);

app.listen(process.env.PORT || 5000,()=>{
    console.log("Backend server is runing !");
})