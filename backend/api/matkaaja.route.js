import express from "express"
//import RestaurantsCtrl from "./restaurants.controller.js"
import MatkaajaCtrl from "./matkaaja.controller.js"




const router = express.Router()

//router.route("/").get(RestaurantsCtrl.apiGetRestaurants)
router
    .route("/")
    .post(MatkaajaCtrl.apiPostmatkaaja)
    .get(MatkaajaCtrl.apiGetmatkaaja)
    .delete(MatkaajaCtrl.apiDeletematkaaja)



//(req, res) => res.send("hello")
export default router