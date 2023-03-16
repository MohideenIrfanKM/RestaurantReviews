import express from "express";
import controller from "../../controller.js"
import revcontroller from "../../revcontroller.js";
const route=express.Router(); //diff between app.use and using this!!!
// route.route("/").get((req,res)=>{res.status(200).send("HELLO Irfan")});

 route.route("/").get(controller.apiGetRestaurants);
 route.route("/id/:id").get(controller.getRestaurantById);
 route.route("/cuisines").get(controller.getCuisines);

 route.route("/review").post(revcontroller.apipost).put(revcontroller.update).delete(revcontroller.delete);




export default route;