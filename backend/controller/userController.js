import User from "../models/userModel.js";
import bcrypt from "bcryptjs";           //to hide password 

import asyncHandler from "../middleware/asyncHandler.js"
import createToken from "../utils/createToken.js"




//creating user

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
        createToken(res,newUser._id);

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



//login user

const loginUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body;
    const existingUser = await User.findOne({email});
    
    if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
    }
    if(existingUser){
        
        //checking for valid password
        const isPasswordValid = await bcrypt.compare(password,existingUser.password);
        if(isPasswordValid){
            

            //token is generated and stored in the browser session
            createToken(res,existingUser._id);
            res.status(200).json({
                id:existingUser._id,
                username : existingUser.username,
                email: existingUser.email,
                password : existingUser.password,
                admin : existingUser.admin,
            });

            return;  //exit the function
        }

        //what if user dont exist >>>>>>>>>>>>??????????????????????


    }
})


const logoutUser = asyncHandler(async (req,res)=>{
    res.cookie("jwt","",{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({"message":"Logged out sucessfully"});
});

const getAllUsers = asyncHandler(async (req,res)=>{
    const users = await User.find({});
    res.json(users);
});


//to get current user profile

const getCurrentUserProfile = asyncHandler(async (req,res,next)=>{
    const user = await User.findById(req.user._id);
    if(user){
        res.json({
            _id : user.id,
            username:user.username,
            email:user.email
        })
    }
    else{
        res.status(404);
        throw new Error("User not found");
    }
});
const updateCurrentUserProfile = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            user.password = hashedPassword; 
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            admin: updatedUser.admin
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

const deleteUserById = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (user) {
        if (user.admin) {
            res.status(400);
            throw new Error("Cannot delete admin");
        } else {
            await User.findByIdAndDelete(user._id); 
            res.json("User deleted");
        }
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

const getUserById = asyncHandler(async (req, res, next) =>{

    const user = await User.findById(req.params.id);
    if(user){
        res.json({
            username: user.username,
            email: user.email,
            password: user.password,
            admin: user.admin
        });
    }
    else{
        res.status(404);
        throw new Error("User not found");
    }
})

const updateUserById = asyncHandler(async (req, res, next) =>{

    const user = await User.findById(req.params.id);
    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.admin = Boolean(req.body.admin) || user.admin;
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            user.password = hashedPassword; 
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            admin: updatedUser.admin
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
})
export {
    createUser,
    loginUser,
    logoutUser,
    getAllUsers,
    getCurrentUserProfile,
    updateCurrentUserProfile,
    deleteUserById,
    getUserById,
    updateUserById
};

