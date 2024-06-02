const {Warehouse} = require('../models/models')
const uuid = require("uuid");
const path = require("path");
class WarehouseController{
    async create(req,res){
        const {name, count} = req.body
        const product = await Warehouse.create({name, count})
        return res.json(product)
    }

    async change(req,res){
        try {
            const {updates} = req.body
            const updatedRecords = [];
            for(const update of updates){
                const {id,name,count} = update
                const record = await Warehouse.findByPk(id)
                if (!record) {
                    return res.status(404).json({ error: `Record with id ${id} not found` });
                }
                const updatedRecord = await record.update({ name, count });
                updatedRecords.push(updatedRecord);
            }
            return res.json(updatedRecords)
        }
        catch(e){
            res.json(e)
        }
    }

    async getAll(req,res){
        const product = await Warehouse.findAll()
        return res.json(product)
    }

    // async getOne(req,res){
    //     const {id_ingredient} = req.params
    //     const ingredient = await Warehouse.findOne({ where:{id_ingredient}});
    //     return res.json(ingredient)
    // }

    async deleteOne(req,res){
        const id = parseInt(req.params.id,10)
        try {
            const product = await Warehouse.destroy({
                where: { id: id }
            });
            if (product) {
                // Запись была успешно удалена
                return res.json(product);
            } else {
                // Запись с указанным product_id не была найдена
                return res.status(404).json({ error: 'Ingredient not found' });
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new WarehouseController()