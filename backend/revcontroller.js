import data from "./data/revdataobj.js";
import mongo from "mongodb";

export default class revcontroller{

    static async apipost(req, res,next)
    {
        try{
            const userInfo = {
                name: req.body.name,
                id: req.body.userid
              }
            let restaurantid=req.body.restaurantid;
            let date=new Date();
            let text=req.body.text;
            let {error}= await data.apipost({userInfo,restaurantid,text,date});
            if(error)
            {
            res.json({failed:error});
            
            }
            else
            res.json({status:"success"});
            console.log("inserted ");
         
        }
        catch(e){
         console.log("Error in post : "+e)
         res.json({error:e.message});
        }

        
    }
    static async update(req,res,next){
        try{

            let reviewid=req.body.reviewid;
            let userid=req.body.userid;
            let date=new Date();
            let text=req.body.text;
            let ress=await data.update({userid,reviewid,text,date});
            res.json({status:"success"});


        }catch(e){
            console.log("Error in update request!"+e.message);
            res.json({error:e.message});
        }
    }

    static async delete(req,res,next){
        try{
            let reviewid=req.body.reviewid; //or should get from url =req.query.reviewid
            let userid=req.body.userid;
            await data.delete({reviewid,userid});
            res.json({status:"success"});


        }
        catch(e)
        {
            console.log("can't delete : "+e.message);
            res.json({status:"failed"});
        }
    }

}