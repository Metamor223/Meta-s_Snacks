const {Warehouse} = require('../models/models')
class WarehouseController{
    async create(req,res){
        const {name, count} = req.body
        const ingredient = await Warehouse.create({name, count})
        return res.json(ingredient)
    }
    async getAll(req,res){
        const ingredients = await Warehouse.findAll()
        return res.json(ingredients)
    }
    async getOne(req,res){

    }
    async deleteOne(req,res){

    }
}

module.exports = new WarehouseController()