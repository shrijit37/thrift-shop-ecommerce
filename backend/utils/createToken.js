import jwt  from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//token is generated and stored in the browser environment and used by other routes

const generateToken = (res,userId)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"30d"});
    
    
    
    //set jwt to http only
    
    res.cookie('jwt',token,{
        httpOnly:true,
        secure : process.env.NODE_ENV !== 'development',
        sameSite:'strict',
        maxAge : 30*24*60*60*1000      //30 days
    })

    return token;
}



export default generateToken;