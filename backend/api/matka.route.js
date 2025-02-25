import express from "express"
//import RestaurantsCtrl from "./restaurants.controller.js"
import MatkaCtrl from "./matka.controller.js"




const router = express.Router()


router
    .route("/")
    .post(MatkaCtrl.apiPostmatka)
    .get(MatkaCtrl.apiGetmatka)
    .delete(MatkaCtrl.apiDeletematka)
    //.put(matkaCtrl.apiPutmatka)
    

//(req, res) => res.send("hello")
export default router