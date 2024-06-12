const {Warehouse} = require('../models/models')
const uuid = require("uuid");
const path = require("path");
class WarehouseController{

    async change(req,res){
        try {
            const {updates} = req.body
            const updatedRecords = [];
            for(const update of updates){
                const id = parseInt(update.id, 10);
                const count = parseInt(update.count, 10);
                const record = await Warehouse.findByPk(id)
                if (!record) {
                    return res.status(404).json({ error: `Record with id ${id} not found` });
                }
                const updatedRecord = await record.update({ count });
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
}

module.exports = new WarehouseController()