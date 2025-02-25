import MatkakohdeDAO from "../dao/matkakohdeDAO.js";

export default class MatkakohdeController{
    static async apiPostmatkakohde(req, res, next){
        try {
            const id = req.body._id
            const idmatka = req.body.idmatkakohde;
            const kohdenimi = req.body.kohdenimi
            const maa = req.body.maa
            const paikkakunta = req.body.paikkakunta
            const kuvausteksti = req.body.kuvausteksti
            const kuva = req.body.kuva


            const MatkakohdeResponse = await MatkakohdeDAO.addMatkakohde(
                id,
                idmatka,
                kohdenimi,
                maa,
                paikkakunta,
                kuvausteksti,
                kuva,
            )
            res.json({status: "success"})
        } catch (e) {
            res.status(500).json({error: e.message})
        }



    }

    static async apiGetmatkakohde(req, res, next){
        

        let filters = {}
        if(req.query.paikkakunta){
            filters.paikkakunta = req.query.paikkakunta
        }else if(req.query.maa){
            filters.maa = req.query.maa
        }else if(req.query.kohdenimi){
            filters.kohdenimi = req.query.kohdenimi
        }else if(req.query._id){
            filters._id = req.query._id
        }

        const {matkakohdeList} = await MatkakohdeDAO.getMatkakohde({
            filters,
        })

        let response = matkakohdeList
        res.json(response)
    }
    
    static async apiDeletematkakohde(req, res, next){
        try {
            const matkakohdeId = req.query._id
            console.log(matkakohdeId)
            const matkakohdeResponse = await MatkakohdeDAO.deleteMatkakohde(matkakohdeId)
            res.json({status : "success"})
        } catch (e) {
            res.status(500).json({error : e.message})
        }
    }


}