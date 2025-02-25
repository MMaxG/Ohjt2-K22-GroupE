import express from "express"
//import RestaurantsCtrl from "./restaurants.controller.js"
import MatkakohdeCtrl from "./matkakohde.controller.js"




const router = express.Router()

//router.route("/").get(RestaurantsCtrl.apiGetRestaurants)
router
    .route("/")
    .post(MatkakohdeCtrl.apiPostmatkakohde)
    .get(MatkakohdeCtrl.apiGetmatkakohde)
    .delete(MatkakohdeCtrl.apiDeletematkakohde)



//(req, res) => res.send("hello")
export default router