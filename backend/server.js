import express from "express"
import cors from "cors"
//import restaurants from "./api/restaurants.route.js"
import matkaaja from "./api/matkaaja.route.js"
import kertomus from "./api/kertomus.route.js"
import matka from "./api/matka.route.js"
import tarina from "./api/tarina.route.js"
import matkakohde from "./api/matkakohde.route.js"


const app = express()

app.use(cors())
app.use(express.json())

//app.use("/api/v1/restaurants", restaurants)
app.use("/api/v1/matkaaja", matkaaja)
app.use("/api/v1/kertomus", kertomus)
app.use("/api/v1/matka", matka)
app.use("/api/v1/tarina", tarina)
app.use("/api/v1/matkakohde", matkakohde)
app.use("*", (req, res) => res.status("404").json({error: "not found"}))

export default app