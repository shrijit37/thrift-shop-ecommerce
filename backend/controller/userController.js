import User from "../models/userModel.js";
import bcrypt from "bcryptjs";           //to hide password 

import asyncHandler from "../middleware/asyncHandler.js"



//checking if user already exists
const createUser =  asyncHandler(async(req,res)=>{
    const {username,email,password} = req.body;
    if(!username||!email||!password){
        throw new Error("fill all the inputs");
    }
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400).json({message:"user already exists"});
    }

    //encrypting password 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword =  await bcrypt.hash(password,salt)
    const newUser = new User({username, email, password:hashedPassword});


    //saving data to the db
    try{
        await newUser.save();
        res.status(200).json({
            id:newUser._id,
            username : newUser.username,
            email: newUser.email,
            password : newUser.password,
            admin : newUser.admin,
        });
    }
    catch(err){
        res.status(400);
        throw new Error("Invalid User Data");
    }
})

export default createUser;

