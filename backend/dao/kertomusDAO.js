import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId;

let kertomus;

export default class KertomusDAO{
    static async injectDB(conn){
        if(kertomus){
            return
        }
        try{
            kertomus = await conn.db(process.env.RESTPROJEKTI_NS).collection("kertomus")
        }catch(e){
            console.error("Unable to establish collection handles: " + e)
        }
    }

    static async addKertomus(id, title, luontipvm, kesto, val, kaup, k1){
        try{
            const KertomusDoc = {
                _id: ObjectId(id),
                title: title,
                luontipvm: luontipvm,
                matkan_kesto: kesto,
                valtio: val,
                kaupunki: kaup,
                kuva1: k1,
            }

            return await kertomus.insertOne(KertomusDoc)
        }catch(e){
            console.error("Unable to post kertomus: " + e)
            return {error}
        }
    }

    static async getKertomus({
        filters = null
    } = {}){
        let query
        if (filters) {
            if ("title" in filters) {
                query = {"title": {$eq: filters["title"] }}
            }
            else if ("valtio" in filters) {
                query = {"valtio": {$eq: filters["valtio"] }}
            }
            else if ("kaupunki" in filters) {
                query = {"kaupunki": {$eq: filters["kaupunki"] }}
            }
            else if ("_id" in filters) {
                query = {"_id": {$eq: ObjectId(filters["_id"]) }}
            }
        }

 

        try{
            const kertomusList = await kertomus.find(query).toArray()

            return {kertomusList}
        }catch(e){
            console.error("unable to convert cursor to array or problem counting documents, " + e)
            return{ kertomusList: []}
        }


    }

    static async deleteKertomus(kertomusId){
        try {
            const deleteResponse = await kertomus.deleteOne({_id : ObjectId(kertomusId)})
            
            return deleteResponse
        } catch (e) {
            console.error("Unable to delete kertomus: " + e)
            return {error: e}
        }

    }

    static async updateKertomus(id, title, luontipvm, kesto, val, kaup, k1){
        try {
            const updateResponse = await kertomus.updateOne(
                {_id: ObjectId(id)},
                {$set: {
                    title: title,
                    luontipvm: luontipvm,
                    matkan_kesto: kesto,
                    valtio: val,
                    kaupunki: kaup,
                    kuva1: k1,
                    }
                }

            )
            
        } catch (e) {
            console.error("Unable to update kertomus: " + e)
            return {error: e}
        }
    }
}