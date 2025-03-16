// models/subscriptions.js

const mongoose = require('mongoose');

const subscriptionSchema= new mongoose.Schema({
    name:{
        type:String,
        required :[true,"enter your beautiful name"],
        trim : true,
        minlength:1,
        maxlength:100
    },
    price:{
        type : Number,
        required:[true , "enter price please"],
        minlength:1

    },
    frequency:{
        type:String,
        enum:["monthly,yearly"],
        required:true

    },
    renewalDate:{
        type:Date,
        required:[true,"enter renewal date"]
    },
    user:{
        type :mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    userEmail :{
       type :String,
       unique : true, 
    }
},{timestamp:true})


const Subscription= mongoose.model('subscription',subscriptionSchema);
module.exports=Subscription;