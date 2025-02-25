import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
//import RestaurantsDAO from "./dao/restaurantsDAO.js"
import MatkaajaDAO from "./dao/matkaajaDAO.js"
import KertomusDAO from "./dao/kertomusDAO.js"
import TarinaDAO from "./dao/tarinaDAO.js"
import MatkaDAO from "./dao/matkaDAO.js"
import MatkakohdeDAO from "./dao/matkakohdeDAO.js"
dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

/*MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI,{
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true 
    }
)
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {
    await RestaurantsDAO.injectDB(client)
    app.listen(port, () =>{
        console.log('servu pyörii portissa 5000')
    })
})*/

MongoClient.connect(
    process.env.RESTREPROJEKTI_DB_URI,{
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true 
    }
)
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {
    await MatkaajaDAO.injectDB(client)
    await KertomusDAO.injectDB(client)
    await TarinaDAO.injectDB(client)
    await MatkaDAO.injectDB(client)
    await MatkakohdeDAO.injectDB(client)
    app.listen(port, () =>{
        console.log('servu pyörii portissa 5000')
    })
})