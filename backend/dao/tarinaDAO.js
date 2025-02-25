import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId;

let tarina;

export default class TarinaDAO{
    static async injectDB(conn){
        if(tarina){
            return
        }
        try{
            tarina = await conn.db(process.env.RESTPROJEKTI_NS).collection("tarina")
        }catch(e){
            console.error("Unable to establish collection handles: " + e)
        }
    }

    static async addTarina(id, idtarina, pvm, teksti, idmatkakohde, idmatka){
        try{
            const TarinaDoc = {
                _id: ObjectId(id),
                idtarina: idtarina,
                pvm: pvm,
                teksti: teksti,
                idmatkakohde: idmatkakohde,
                idmatka: idmatka,
            }

            return await tarina.insertOne(TarinaDoc)
        }catch(e){
            console.error("Unable to post tarina: " + e)
            return {error}
        }
    }

    static async getTarina({
        filters = null
    } = {}){
        let query
        if (filters) {
            if ("idmatkakohde" in filters) {
                query = {"idmatkakohde": {$eq: filters["idmatkakohde"] }}
            }
            else if ("_id" in filters) {
                query = {"_id": {$eq: ObjectId(filters["_id"]) }}
            }
            else if ("idtarina" in filters) {
                query = {"idtarina": {$eq: filters["idtarina"] }}
            }
            else if ("idmatka" in filters) {
                query = {"idmatka": {$eq: filters["idmatka"] }}
            }
        }

 

        try{
            const tarinaList = await tarina.find(query).toArray()

            return {tarinaList}
        }catch(e){
            console.error("unable to convert cursor to array or problem counting documents, " + e)
            return{ tarinaList: []}
        }


    }

    static async deleteTarina(tarinaId){
        try {
            const deleteResponse = await tarina.deleteOne({_id : ObjectId(tarinaId)})
            
            return deleteResponse
        } catch (e) {
            console.error("Unable to delete tarina: " + e)
            return {error: e}
        }

    }
}