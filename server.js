const express = require('express');
const app = express();
require('dotenv').config();


const PORT = process.env.PORT ||5000;
//mongoose connection 
const connectToMongodb = require("./mongoose.connection")

// routes import
const userRouter =require("./routes/userRouter");
const subscriptionRouter=require("./routes/subscriptionRouter");
const workflowRoute= require("./routes/workflowRouter");

// middleware 
app.use(express.json());
app.use(express.urlencoded({extended : false}));

// define routes
app.use('/api/users', userRouter);
app.use('/api/subscriptions',subscriptionRouter);
app.use('/api/workflow',workflowRoute)

app.get('/',(req,res)=>{
    res.send("well come to subscriptions API")
})
// middleware to handle wrong request
app.use((req,res,next)=>{
  const error = new Error("entered wrong path -NOT FOUND-");
   error.statusCode=404;
   next(error);
})

// centralized error handler
app.use((err,req,res,next)=>{
    console.log(err.stack);
    
    res.status(err.status ||500).json({
        error:{
            
            message:err.message,
            status:err.status ||500
        }
    })
})

app.listen(PORT,async ()=>{
    console.log(process.env.JWT_SCERET);
    await connectToMongodb();
    console.log(`server is started at ${PORT}`);
})