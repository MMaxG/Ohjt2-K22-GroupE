import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId;

let matkakohde

export default class MatkakohdeDAO{
    static async injectDB(conn){
        if(matkakohde){
            return
        }
        try{
            matkakohde = await conn.db(process.env.RESTPROJEKTI_NS).collection("matkakohde")
        }catch(e){
            console.error('unable to establish a collection handle in matkakohdeDAO:' + e)
        }
    }

    static async addMatkakohde(id, idmatkakohde, kohdenimi, maa, paikkakunta, kuvausteksti, kuva){
        try{
            const MatkakohdeDoc = {
                _id: ObjectId(id),
                idmatkakohde: idmatkakohde,
                kohdenimi: kohdenimi,
                maa: maa,
                paikkakunta: paikkakunta,
                kuvausteksti: kuvausteksti,
                kuva: kuva,

            }

            return await matkakohde.insertOne(MatkakohdeDoc)
        }catch(e){
            console.error("Unable to post matkakohde: " + e)
            return {error}
        }
    }


    static async getMatkakohde({
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
            }else if ("kohdenimi" in filters) {
                query = {"kohdenimi": {$eq: filters["kohdenimi"] }}
            }else if ("maa" in filters) {
                query = {"maa": {$eq: filters["maa"] }}
            }
        }    


        try{
            const matkakohdeList = await matkakohde.find(query).toArray()

            return {matkakohdeList}
        }catch(e){
            console.error("unable to convert cursor to array or problem counting documents, " + e)
            return{ matkakohdeList: []}
        }

    }

    static async deleteMatkakohde(matkakohdeId){
        try {
            const deleteResponse = await matkakohde.deleteOne({_id : ObjectId(matkakohdeId)})
            
            return deleteResponse
        } catch (e) {
            console.error("Unable to delete matkakohde: " + e)
            return {error: e}
        }

    }
}