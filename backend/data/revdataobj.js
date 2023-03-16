import mongo from "mongodb";
let reviews;
const  object=mongo.ObjectId;

export default class revdataobj{
    static async dbinject(conn){
        if(reviews){
            return ;
        }
        try{
            reviews= await conn.db(process.env.DB_Name).collection("reviews");
        }
        catch(err){
            console.log("Error in connecting with db : "+err);
            process.exit(1);
        }
    }
    static async apipost({
        userInfo,
        restaurantid,
        text,
        date

    }){
      

        let res;
        

        
        try{
            if(!restaurantid)
            throw new Error("restraunt null");
            else
            res={
                name:userInfo.name,
                userid:userInfo.id,
                restaurantid:new object(restaurantid),
                text,
                date,
                
        
                
            }
           return  await reviews.insertOne(res);
        }
        catch(e){
            console.log("Cannot add in db : "+e);
            let error={error:e.message}
            
            return error;
        }
    }
    static async update({userid,reviewid,text,date}){
        let res;
        

        
        try{
          let ress= await reviews.updateOne({
              userid,
              _id:new object(reviewid)

              
             
          },{$set:{text,date}});
          return ress;
        }
        catch(e){
            console.log("cant update "+e);
            return {error : e}
        }
    }
    static async delete({reviewid,userid}){

        try{
            await reviews.deleteOne({userid,_id:new object(reviewid)});
        }
        catch(e){
            console.log("Error "+e.message);
            return{error : e}
        }
    
    }

}