const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
require('dotenv').config();

 const registerUser = async (req,res)=>{

    try{
   const{name, email,password}=req.body;

   if(!name || !email ||!password){
     return res.status(400).json({
        status:"fail",
        message:"all the fields are requried"
    })}
    const userExist = await User.findOne({email});
    if(userExist){
        return res.status(400).json({messgae:"user with email already exist"});
    }

    const salt = await bcrypt.genSalt(10);
    const new_password =await bcrypt.hash(password,salt);

    const newuser = await User.create({name,email,password:new_password});
    res.status(201).json({message:"user registered", userId :newuser._id});
}catch(err){
    console.log(err.message);
    res.status(500).json({message:"server error"})
}

}

const loginUser = async (req, res) => {
    try { 
        const { email, password } = req.body;
        const existUser = await User.findOne({ email });
        if (!existUser) {
            return res.status(404).json({ message: "Please register before login" });
        }
        const verifyPassword = await bcrypt.compare(password, existUser.password);
        if (!verifyPassword) {
            return res.status(301).json({ message: "Enter correct password" });
        }
        const token = jwt.sign({ id: existUser._id },process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ message: "Logged in successfully", token });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

module.exports ={registerUser,loginUser};