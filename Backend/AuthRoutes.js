const express = require('express');
const router = express.Router();
const mysql = require('mysql2')
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
dotenv.config({path:'./.env'})

// Db connections

const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:process.env.DB_Password,
    database:'todo'
  })
  

router.post('/register',(req,res)=>{

    

    console.log(req.body)
    const {username,email,password,confirmPassword} = req.body;
try {
    

    if(!email || !password) {
  
        res.status(401).send("Please check Email and Password")
        return
    }

    const validationQuery = `Select Email from  user_table where Email= '${email}' `
    db.query(validationQuery,async(error,result)=>{
        if(error){
            console.log("Error on Register!")
            console.log("Error" ,error)
            res.send(error)
            // res.status(401).send(error)
          
        }

       if(password !== confirmPassword){
            res.send("Passwords not match!")
            return
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password,salt)

        const insertQuery = `Insert into user_table (username,email,password) values ('${username}','${email}','${hashedPassword}')`
        db.query(insertQuery,(result,err)=>{
            if(err){
                console.log("insert Error: ", err)
                res.send(err)
                return
            }
            else{
                console.log(result)
                console.log("User registered successfully!")
                res.send(result)
            }
        })

    })
} catch (error) {
    console.log(error)
}
})

router.post('/login',(req,res)=>{
    const {email,password} = req.body;

        if(email.length !== 0 && password.length !== 0 ){
            
  try {
    
    
    const validationQuery = `Select * from  user_table where email='${email}' `
    db.query(validationQuery ,async(error,result)=>{
       
        if(error){
            console.log(error)
            console.log("Wrong Email!")
            res.send("Invalid Email")
            
        }else{
            console.log(result)
        }

        if(!result.length || !await bcrypt.compare(password, result[0].password)){
            res.send("Wrong Email or Password!")
            return
        }
        else{

          
            const token = jwt.sign({user:result[0].id}, process.env.JWT_SECRET)
          
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite:"none"
            })
       
            
            
          return res.send(result)
        }
       
    })
} 
catch (error) {
    console.log(e);
        res.send("Login Error")
  }   
}

})


router.get('/logout', (req, res) => {
    
    res.cookie("token","", {
        httpOnly: true,
        expires:new Date(0),
        secure: true,
        sameSite:"none"
    })


    res.status(200).send("Logged Out SuccessFully");
    console.log("logged out")
})


module.exports = router;