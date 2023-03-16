import mongo from "mongodb";
let cobject=mongo.ObjectId;
let restaurants;
export default class dataobj{
    static async dbinject(conn){
        if(restaurants){
            return ;
        }
        try{
            restaurants= await conn.db(process.env.DB_Name).collection("restaurants");
        }
        catch(err){
            console.log("Error in connecting with db : "+err);
            process.exit(1);
        }
    }

    static async GetRestaurants({
        filter = null,
        page = 0,
        docsperpage = 20,

    }={})
    {
        let query;
        if(filter!=null){
            if("name" in filter)
            {
                query={$text:{$search:filter["name"]}}
            }
            else if("cuisine" in filter){
                query={cuisine:{$eq:filter["cuisine"]}}

            }
            else if("zipcode" in filter)
            {
                query={"address.zipcode":{$eq:filter["zipcode"]}}
            }
        }
        let cursor;

        try {
            cursor = await restaurants.find(query);//how find works here!!!
          } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { restaurantsList: [], totalNumRestaurants: 0 }
          }

          const displayCursor = cursor.limit(docsperpage).skip(docsperpage * page);

          try {
            const restaurantsList = await displayCursor.toArray();
            const totalNumRestaurants = await restaurants.countDocuments(query)
      
            return { restaurantsList, totalNumRestaurants }
          } catch (e) {
            console.error(
              `Unable to convert cursor to array or problem counting documents, ${e}`,
            )
            return { restaurantsList: [], totalNumRestaurants: 0 }
          }
    }
    static async getRestaurantById(id)
    {
        // const pipeline=[
        //     {
        //         $match:
        //         {
        //             _id:new cobject(id) ,
        //         }
        //     },
        //     {
        //         $lookup:{
        //             from:"reviews",
        //             let:{
        //                 resid:"$_id",
        //             },
        //             pipeline:[
        //                 {
        //                     $match:{
        //                         $expr:{
        //                             $eq:["$restaurantid","$$resid"]
        //                         },
        //                     },
        //                     $sort:{
        //                         date:-1,
        //                     },
        //                 },
        //             ],
        //             as:"Reviews"
        //         }
        //     }
        // ]


        const pipeline=[
            {
              $match: {
                _id: new cobject(id)
              }
            },
            {
                
                    $lookup: {
                      from: "reviews",
                      localField: "_id",
                      foreignField: "restaurantid",
                      as: "Reviews",
                      pipeline:[
                          {
                              $sort:{
                                  date:-1
                              }
                          }
                      ]
                    }

                }
            ];
                  
            //   $lookup: {
            //     from: "reviews",
            //     let: {
            //       resid: "$_id"
            //     },
            //     pipeline: [
            //       {
            //         $match: {
            //           $expr: {
            //             $eq: ["$restaurantid", "$$resid"]
            //           }
            //         }
            //       },
            //     //   {
            //     //     $sort: {
            //     //       date: -1
            //     //     }
            //     //   }
            //     ],
            //     as: "Reviews"
            //   }
            // }
            // // ,{
            // //     $addFields:{
            // //         Reviews:"$Reviews"
            // //     }
       
        return await restaurants.aggregate(pipeline).next();
    }
    static async getCuisine(){
        try{
            
            const cuisines=await restaurants.distinct("cuisine");
            return cuisines;
        }
        catch(e)
        {
            console.log("error: "+e);
        }
   
    }

}