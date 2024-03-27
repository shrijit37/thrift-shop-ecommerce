import path from "path";
import express from "express";   
import dotenv from "dotenv"
import cookieParser from "cookie-parser";


import connectDb from "./config/db.js";

dotenv.config();
const port = process.env.PORT || 3000;
connectDb();


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


app.get('/', (req, res) =>{
    res.send("hi there!");
})

app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
})


