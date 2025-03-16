const express = require("express");
const userRouter = express.Router();
const {registerUser,loginUser}= require("../controller/user.contoller");
const userController= require("../controller/user.contoller")
userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)

module.exports= userRouter;