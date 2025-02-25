import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId;

let matka;

export default class MatkaDAO{
    static async injectDB(conn){
        if(matka){
            return
        }
        try{
            matka = await conn.db(process.env.RESTPROJEKTI_NS).collection("matka")
        }catch(e){
            console.error("Unable to establish collection handles: " + e)
        }
    }

    static async addMatka(id, idmatkaaja, alkupvm, loppupvm, yksityinen, idmatka){
        try{
            const MatkaDoc = {
                _id: ObjectId(id),
                idmatkaaja: idmatkaaja,
                alkupvm: alkupvm,
                loppupvm: loppupvm,
                yksityinen: yksityinen,
                idmatka: idmatka,
            }

            return await matka.insertOne(MatkaDoc)
        }catch(e){
            console.error("Unable to post matka: " + e)
            return {error}
        }
    }

    static async getMatka({
        filters = null
    } = {}){
        let query
        if (filters) {
            if ("idmatkaaja" in filters) {
                query = {"idmatkaaja": {$eq: filters["idmatkaaja"] }}
            }
            else if ("_id" in filters) {
                query = {"_id": {$eq: ObjectId(filters["_id"]) }}
            }
        }

 

        try{
            const matkaList = await matka.find(query).toArray()

            return {matkaList}
        }catch(e){
            console.error("unable to convert cursor to array or problem counting documents, " + e)
            return{ matkaList: []}
        }


    }

    static async deleteMatka(matkaId){
        try {
            const deleteResponse = await matka.deleteOne({_id : ObjectId(matkaId)})
            
            return deleteResponse
        } catch (e) {
            console.error("Unable to delete matka: " + e)
            return {error: e}
        }

    }
}