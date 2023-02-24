const mysql=require("mysql")
const env=require('dotenv').config()
const con=mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    port:process.env.D_PORT
});

con.connect((err)=>{
    if(err) throw err;
    console.log("Connection created successfull ..");
})

module.exports.con=con;