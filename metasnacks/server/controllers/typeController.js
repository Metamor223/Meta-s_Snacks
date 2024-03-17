const {TypeOfProduct, Product} = require('../models/models')
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

    async deleteOne(req,res){
        const id = parseInt(req.params.id,10)
        try {
            const type = await TypeOfProduct.destroy({
                where: {id: id}
            });
            if (type) {
               return res.json(type)
            } else {
                // Запись с указанным product_id не была найдена
                return res.status(404).json({ error: 'Product not found' });
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new TypeController()