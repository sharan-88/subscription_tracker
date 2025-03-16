const mongoose = require('mongoose')
const express = require('express');

const schema = new mongoose.Schema({
    name:{
        type:String,
        require:[true,"enter yoour name"],
        trim : true,

    },
    email:{
        type:String,
        require:[true ,"enter email"],
        unique:true,
    },
    password: { 
        type: String, 
        required: true
     },
    subscriptions:[{
        type:mongoose.Schema.Types.ObjectId,
        ref : "Subscription"
    }]
},{timestamps:true})


const User = mongoose.model("User",schema)


module.exports=User