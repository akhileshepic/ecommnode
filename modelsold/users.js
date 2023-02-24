
const connection=require('../configold/databaseconnect').con
// var Users=function(users){
//  // this.username=users.username;
//  // this.phoneno=users.phoneno;
//  // this.emailid=users.emailid;
//  // //this.gender=users.gender;

// }

const create=(data,cb)=>{
 const datas=data;
connection.query("SELECT COUNT(*) AS email FROM test WHERE emailid = ? " , 
data.emailid , function(err , datas){
   if(err){
       cb(null,err);
   }   
   else{
       if(datas[0].email > 0){  
            cb(null,{message:"alredy exits"})
        
       }else{
           let sqlQuery=connection.query("insert INTO test set  ?",[data],function(error,results,filed){
     
               if(error){
                cb(null,error);
               }else{
                
                cb(null,{message:"added",lastID:results.insertId, })
              
               }
           })                  
       }
   }
})
}

const findAll=(cb)=>{
   let sqlQuery="Select * from test";
     connection.query(sqlQuery,function(error,results,filed){
       if(error){
        cb(null,error)
       }
       cb(null,results);
       });
}

const findById=(id,cb)=>{
  let sqlQuery="Select * from test WHERE id=?";
     connection.query(sqlQuery,[id],function(error,results,filed){
       if(error) {
        cb(null,error)
       } 
        cb(null,results)
       });
}
// Users.findById=()=>{
  
// }

// Users.update=()=>{
  
// }

// Users.delete=()=>{
  
// }

const update=(id,data,cb)=>{
  let sqlQuery=connection.query("Update test Set username=?,phoneno=?,emailid=?,gender=? where id=?",[data.username,data.phoneno,data.emailid,data.gender,id],function(error,results,filed){
        if(error){
          cb(null,error)
        }
         cb(null,{message:"Update",id:id})
       
       });
}

const userdelete=(id,cb)=>{

  let sqlQuery=connection.query("DELETE FROM test WHERE  id=?",[id],function(error,results,filed){
      if(error){
          cb(null,error)
      }
         cb(null,{message:"users deleted successfully"})
       
  });
}
module.exports={
findAll,
findById,
create,
update,
userdelete
};