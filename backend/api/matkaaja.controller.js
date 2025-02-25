import MatkaajaDAO from "../dao/matkaajaDAO.js";

export default class MatkaajaController{
    static async apiPostmatkaaja(req, res, next){
        try {
            const id = req.body._id
            const etunimi = req.body.etunimi
            const sukunimi = req.body.sukunimi
            const nimimerkki = req.body.nimimerkki
            const paikkakunta = req.body.paikkakunta
            const esittely = req.body.esittely
            const kuva = req.body.kuva
            const email = req.body.email
            const password = req.body.password
            const matkat = req.body.matkat

            const MatkaajaResponse = await MatkaajaDAO.addmatkaaja(
                id,
                etunimi,
                sukunimi,
                nimimerkki,
                paikkakunta,
                esittely,
                kuva,
                email,
                password,
                matkat,
            )
            res.json({status: "success"})
        } catch (e) {
            res.status(500).json({error: e.message})
        }



    }

    static async apiGetmatkaaja(req, res, next){
        

        let filters = {}
        if (req.query.etunimi) {
            filters.etunimi = req.query.etunimi
        }else if(req.query.sukunimi){
            filters.sukunimi = req.query.sukunimi
        }else if(req.query.paikkakunta){
            filters.paikkakunta = req.query.paikkakunta
        }else if(req.query.nimimerkki){
            filters.nimimerkki = req.query.nimimerkki
        }else if(req.query._id){
            filters._id = req.query._id
        }

        const {matkaajaList} = await MatkaajaDAO.getmatkaaja({
            filters,
        })

        let response = matkaajaList
        res.json(response)
    }
    
    static async apiDeletematkaaja(req, res, next){
        try {
            const matkaajaId = req.query._id
            console.log(matkaajaId)
            const matkaajaResponse = await MatkaajaDAO.deleteMatkaaja(matkaajaId)
            res.json({status : "success"})
        } catch (e) {
            res.status(500).json({error : e.message})
        }
    }


}