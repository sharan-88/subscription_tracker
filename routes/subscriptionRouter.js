const express = require("express");
const subscriptionRouter = express.Router();
const Subscription=require("../models/subscriptions")
const { getSubscriptionById,addSubscription} = require("../controller/subscription.controller")

// middleware import 
const authMiddleware = require("../middleware/auth.middleware");

subscriptionRouter.use(authMiddleware);


subscriptionRouter.post('/',addSubscription)

subscriptionRouter.get('/',(req,res)=>{
    res.json({
        message :"post subscription"
    })}
)
subscriptionRouter.get('/:id', getSubscriptionById
)
subscriptionRouter.put('/:id',(req,res)=>{
    res.json({
        message :"put subscription"
    })}
)

subscriptionRouter.delete('/:id',(req,res)=>{
    res.json({
        message :"put subscription"
    })
})


 module.exports = subscriptionRouter;