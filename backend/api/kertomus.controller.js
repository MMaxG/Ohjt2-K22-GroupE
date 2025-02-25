
import KertomusDAO from "../dao/kertomusDAO.js";

export default class KertomusController{
    static async apiPostkertomus(req, res, next){
        try {
            const id = req.body._id
            const title = req.body.title
            const kesto = req.body.matkan_kesto
            const luontipvm = new Date()
            const val = req.body.valtio
            const kaup = req.body.kaupunki
            const k1 = req.body.kuva1

            const KertomusResponse = await KertomusDAO.addKertomus(
                id,
                title,
                luontipvm,
                kesto,
                val,
                kaup,
                k1,
            )
            res.json({status: "success"})
        } catch (e) {
            res.status(500).json({error: e.message})
        }



    }

    static async apiGetkertomus(req, res, next){
        const kertomusPerPage = req.query.kertomusPerPage ? parseInt(req.query.kertomusPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if (req.query.title) {
            filters.title = req.query.title
        }else if(req.query.valtio){
            filters.valtio = req.query.valtio
        }else if(req.query.kaupunki){
            filters.kaupunki = req.query.kaupunki
        }else if(req.query._id){
            filters._id = req.query._id
        }

        const {kertomusList} = await KertomusDAO.getKertomus({
            filters
        })

        let response = kertomusList
        res.json(response)
    }

    static async apiDeletekertomus(req, res, next){
        try {
            const kertomusId = req.query._id
            console.log(kertomusId)
            const kertomusResponse = await KertomusDAO.deleteKertomus(kertomusId)
            res.json({status : "success"})
        } catch (e) {
            res.status(500).json({error : e.message})
        }
    }

    static async apiPutkertomus(req, res, next){
        try{
            const id = req.query._id
            const title = req.body.title
            const kesto = req.body.matkan_kesto
            const luontipvm = new Date()
            const val = req.body.valtio
            const kaup = req.body.kaupunki
            const k1 = req.body.kuva1

            const KertomusResponse = await KertomusDAO.updateKertomus(
                id,
                title,
                luontipvm,
                kesto,
                val,
                kaup,
                k1,
            )

            var {error} = KertomusResponse
            if(error){
                res.status(400).json(error)
            }
        }catch(e){
            res.status(500).json({error : e.message})
        }
    }
}