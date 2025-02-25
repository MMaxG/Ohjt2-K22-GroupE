import express from "express"
//import RestaurantsCtrl from "./restaurants.controller.js"
import TarinaCtrl from "./tarina.controller.js"


const router = express.Router()


router
    .route("/")
    .get(TarinaCtrl.apiGettarina)
    .post(TarinaCtrl.apiPosttarina)
    .delete(TarinaCtrl.apiDeletetarina)
    //.put(TarinaCtrl.apiPutTarina)
    

//(req, res) => res.send("hello")
export default router