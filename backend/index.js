

import app from "./server.js";
import mongo from "mongodb";
import dotenv from "dotenv";
import data from "./data/dataobj.js";
import data2 from "./data/revdataobj.js";
dotenv.config();
//what happens ... is this responsible for connecting .env or any other reason
//used to load env file

const mongos=mongo.MongoClient;
const port = process.env.port || 4000;

mongos.connect(
    process.env.RESTREVIEWS_DB_URI,
    {
        maxPoolSize:50,
        writeConcern:{
            wtimeout:15000
        }
    

    }
)
.catch((err)=>{
    console.log(err.stack);
    console.log("CANT FIND THE DATABASE!!");
    process.exit(1);
})
.then(async  res=>{
    await data.dbinject(res);
    await data2.dbinject(res);

    app.listen(port,()=>{
        console.log(`listening on port ${port} `);

    });

    
})