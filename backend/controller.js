import data from "./data/dataobj.js";

export default class controller{

    static async apiGetRestaurants(req,res,next){
        let filter={}

        let docsperpage= (req.query.docsperpage)?parseInt(req.query.docsperpage,10):20;
        let page =(req.query.page)?parseInt(req.query.page,10):0;
        if(req.query.name){
            filter.name=req.query.name;
        }
        else if(req.query.cuisine){
            filter.cuisine=req.query.cuisine;
        }
        else if(req.query.zipcode){
            filter.zipcode=req.query.zipcode;
        }
        const { restaurantsList, totalNumRestaurants }= await data.GetRestaurants({
            filter,
            page,
            docsperpage
        });

        let response={
            restaurantsList,
            totalNumRestaurants,
            filter,
            docsperpage,
            page
        }
        res.json(response);
        
    }
    static async getRestaurantById(req,res,next){
        try{
            const ids=req.params.id || {};

            const result=await data.getRestaurantById(ids);
            if(!result){
                console.log("Error.. not founf");
                throw new Error("Can't find restraunt");
            }

            res.json(result);


        }
        catch(e)
        {
            console.log("can't find the Restaurant with the given Id");
            res.json({error:e});
        }
    }
    static async getCuisines(req,res,next){
        try{
            const cousine=await data.getCuisine();
            
                res.json(cousine);
          
        }
        catch(e){
            console.log(e.message);
            res.json({error:e.message});
        }
    }
}