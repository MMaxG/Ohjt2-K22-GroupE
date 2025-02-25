
import MatkaDAO from "../dao/matkaDAO.js";

export default class MatkaController{
    static async apiPostmatka(req, res, next){
        try {
            const id = req.body._id
            const idmatkaaja = req.body.idmatkaaja
            const alkupvm = req.body.alkupvm
            const loppupvm = req.body.loppupvm
            const yksityinen = req.body.yksityinen
            const idmatka = req.body.idmatka

            const MatkaResponse = await MatkaDAO.addMatka(
                id,
                idmatkaaja,
                alkupvm,
                loppupvm,
                yksityinen,
                idmatka
            )
            res.json({status: "success"})
        } catch (e) {
            res.status(500).json({error: e.message})
        }



    }

    static async apiGetmatka(req, res, next){
        const matkaPerPage = req.query.matkaPerPage ? parseInt(req.query.matkaPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if (req.query.idmatkaaja) {
            filters.idmatkaaja = req.query.idmatkaaja
        }else if(req.query._id){
            filters._id = req.query._id
        }

        const {matkaList} = await MatkaDAO.getMatka({
            filters
        })

        let response = matkaList
        res.json(response)
    }

    static async apiDeletematka(req, res, next){
        try {
            const matkaId = req.query._id
            console.log(matkaId)
            const matkaResponse = await MatkaDAO.deleteMatka(matkaId)
            res.json({status : "success"})
        } catch (e) {
            res.status(500).json({error : e.message})
        }
    }
}