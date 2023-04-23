const express = require('express');
const router = express.Router();
const mysql = require('mysql2')
const dotenv = require('dotenv');
dotenv.config({path:'./.env'})

// Db connections

const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:process.env.DB_Password,
    database:'todo'
  })
  

router.post('/getTodo',(req,res)=>{
  const createdBy = req.body.createdBy
    const selectQuery = `SELECT * FROM todo_table where is_active='true' and created_by='${createdBy}'`
    db.query(selectQuery,(err,result)=>{
    console.log(err);
    //console.log(res)
    res.send(result)
  })
})

router.post('/addTodo',(req,res)=>{
    const data = req.body
    console.log(data)
    const insertQuery = `Insert into todo_table (task,description,status,is_active,created_by) values ('${data.task}','${data.description}','${data.status}','true','${data.createdBy}')`
    db.query(insertQuery,(err,result)=>{
        if(err){
            console.log(err);
        }
  
    console.log(result)
    res.send(result)
  })
})

router.patch('/editTodo/:id',(req,res)=>{
    const id = req.params.id
    const body = req.body
    let updateQuery = null;
    console.log(id,body)

    if(body.task.length === 0){
         updateQuery = `update todo_table set  description = '${req.body.description}',status = '${req.body.status}' where is_active ='true' and id = ${id}`
    }else if(body.description.length === 0){
         updateQuery = `update todo_table set task = '${req.body.task}', status = '${req.body.status}' where is_active ='true' and id = ${id}`
    }else if(body.status.length === 0){
      updateQuery = `update todo_table set description = '${req.body.description}',task = '${req.body.task}' where is_active ='true' and id = ${id}`
 }
    else{
        updateQuery = `update todo_table set task = '${req.body.task}' , description = '${req.body.description}' ,status = '${req.body.status}' where is_active ='true' and id = ${id}`
    }
   
    db.query(updateQuery,(err,result)=>{
        if(err){
            console.log(err);
        }
  
    console.log(result)
    res.send(result)
  })
})



router.delete('/deleteTodo/:id',(req,res)=>{
    const id = req.params.id
    console.log(id)
    const deleteQuery = `delete from todo_table where id = ${id}`
    db.query(deleteQuery,(err,result)=>{
        if(err){
            console.log(err);
        }
  
    console.log(result)
    res.send(result)
  })
})


module.exports = router;