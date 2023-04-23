const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require("cors")
const dotenv = require('dotenv');





// routes 
const todoRoutes = require('./TodoRoutes')
const authRoutes = require('./AuthRoutes')



app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(todoRoutes)
app.use(authRoutes)



app.get('/',(req,res)=>{

  res.send("welcome")

   
})


app.listen(8080,(req,res)=>{
  console.log("Server is listening on port 8080")
})