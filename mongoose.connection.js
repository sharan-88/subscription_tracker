const mongoose = require('mongoose');
const express = require('express')
require('dotenv').config();

const connectToMongodb = async()=>{
    try{
        await mongoose.connect(process.env.URL);
        console.log("mongoose connected successfully")
    }catch(err){
        console.log("mongoose connection failed -- please try  again")
    }
}

module.exports =connectToMongodb