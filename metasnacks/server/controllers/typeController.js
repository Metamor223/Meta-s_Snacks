const {Type} = require('../models/models')
const ApiError = require('../error/ApiError');

class TypeController{
    async create(req,res){
        const {name} = req.body
        const type = await Type.create({name})
        return res.json(type)
    }
    async getAll(req,res){
       const types = await Type.findAll()
        return res.json(types)
    }

    async deleteOne(req,res){
        const id = parseInt(req.params.id,10)
        try {
            const type = await Type.destroy({
                where: {id: id}
            });
            if (type) {
               return res.json(type)
            } else {
                // Запись с указанным product_id не была найдена
                return res.status(404).json({ error: 'Category not found' });
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new TypeController()