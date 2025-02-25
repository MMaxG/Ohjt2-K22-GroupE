
import TarinaDAO from "../dao/tarinaDAO.js";

export default class TarinaController{
    static async apiPosttarina(req, res, next){
        try {
            const id = req.body._id
            const idtarina = req.body.idtarina
            const pvm = new Date()
            const teksti = req.body.teksti
            const idmatkakohde = req.body.idmatkakohde
            const idmatka = req.body.idmatka

            const TarinaResponse = await TarinaDAO.addTarina(
                id,
                idtarina,
                pvm,
                teksti,
                idmatkakohde,
                idmatka,
            )
            res.json({status: "success"})
        } catch (e) {
            res.status(500).json({error: e.message})
        }



    }

    static async apiGettarina(req, res, next){
        const tarinaPerPage = req.query.tarinaPerPage ? parseInt(req.query.tarinaPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if (req.query.idtarina) {
            filters.idtarina = req.query.idtarina
        }else if(req.query.idmatkakohde){
            filters.idmatkakohde = req.query.idmatkakohde
        }else if(req.query._id){
            filters._id = req.query._id
        }else if(req.query.idmatka){
            filters.idmatka = req.query.idmatka
        }

        const {tarinaList} = await TarinaDAO.getTarina({
            filters
        })

        let response = tarinaList
        res.json(response)
    }

    static async apiDeletetarina(req, res, next){
        try {
            const tarinaId = req.query._id
            console.log(tarinaId)
            const tarinaResponse = await TarinaDAO.deleteTarina(tarinaId)
            res.json({status : "success"})
        } catch (e) {
            res.status(500).json({error : e.message})
        }
    }
}