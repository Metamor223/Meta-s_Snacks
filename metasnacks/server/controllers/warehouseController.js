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
        const {id_ingredient} = req.params
        const ingredient = await Warehouse.findOne({ where:{id_ingredient}});
        return res.json(ingredient)
    }
    async deleteOne(req,res){
        const {id_ingredient} = req.params
        try {
            const recipes = await Warehouse.destroy({
                where: { id_ingredient }
            });
            if (recipes) {
                // Запись была успешно удалена
                return res.json({ message: 'Ingredient deleted successfully' });
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