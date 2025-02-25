import express from "express"
//import RestaurantsCtrl from "./restaurants.controller.js"
import KertomusCtrl from "./kertomus.controller.js"




const router = express.Router()


router
    .route("/")
    .post(KertomusCtrl.apiPostkertomus)
    .get(KertomusCtrl.apiGetkertomus)
    .delete(KertomusCtrl.apiDeletekertomus)
    .put(KertomusCtrl.apiPutkertomus)
    

//(req, res) => res.send("hello")
export default router