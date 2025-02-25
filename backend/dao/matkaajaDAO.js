import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId;

let matkaaja

export default class matkaajaDAO{
    static async injectDB(conn){
        if(matkaaja){
            return
        }
        try{
            matkaaja = await conn.db(process.env.RESTPROJEKTI_NS).collection("matkaaja")
        }catch(e){
            console.error('unable to establish a collection handle in matkaajaDAO:' + e)
        }
    }

    static async addmatkaaja(id, etunimi, sukunimi, nimimerkki, paikkakunta, esittely, kuva, email, password, matkat){
        try{
            const MatkaajaDoc = {
                _id: ObjectId(id),
                etunimi: etunimi,
                sukunimi: sukunimi,
                nimimerkki: nimimerkki,
                paikkakunta: paikkakunta,
                esittely: esittely,
                kuva: kuva,
                email: email,
                password: password,
                matkat: matkat
            }

            return await matkaaja.insertOne(MatkaajaDoc)
        }catch(e){
            console.error("Unable to post matkaaja: " + e)
            return {error}
        }
    }


    static async getmatkaaja({
        filters = null
    } = {}){
        let query
        if (filters) {
            if ("etunimi" in filters) {
                query = {"etunimi": {$eq: filters["etunimi"] }}
            }else if ("sukunimi" in filters) {
                query = {"sukunimi": {$eq: filters["sukunimi"] }}
            }
            else if ("paikkakunta" in filters) {
                query = {"paikkakunta": {$eq: filters["paikkakunta"] }}
            }else if ("nimimerkki" in filters) {
                query = {"nimimerkki": {$eq: filters["nimimerkki"] }}
            }else if ("_id" in filters) {
                query = {"_id": {$eq: ObjectId(filters["_id"]) }}
            }
        }    


        try{
            const matkaajaList = await matkaaja.find(query).toArray()

            return {matkaajaList}
        }catch(e){
            console.error("unable to convert cursor to array or problem counting documents, " + e)
            return{ matkaajaList: []}
        }

    }

    static async deleteMatkaaja(matkaajaId){
        try {
            const deleteResponse = await matkaaja.deleteOne({_id : ObjectId(matkaajaId)})
            
            return deleteResponse
        } catch (e) {
            console.error("Unable to delete matkaaja: " + e)
            return {error: e}
        }

    }
}