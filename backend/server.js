import express from "express";
import cors from "cors";
import routes from "./api/ve2/routes.js";

const app=express();//why not using new //why type:module // inorder to use ecma module for transferring js elements from one js file to other easily
app.use(express.json());//why //  used to parse request body which contains json
app.use(cors()); // why cors() /// allow our app to accessible from other domains

app.use("/api/v1/res",routes);
app.use("*",(req,res)=>{
    res.status(404).json({error:"Page Not Found--Check if you entered valid URL!"});
    
});

export default app;
