const {TypeOfProduct} = require('../models/models')
const ApiError = require('../error/ApiError');

class TypeController{
    async create(req,res){
        const {name_type} = req.body
        const type = await TypeOfProduct.create({name_type})
        return res.json(type)
    }
    async getAll(req,res){
       const types = await TypeOfProduct.findAll()
        return res.json(types)
    }
}

module.exports = new TypeController()