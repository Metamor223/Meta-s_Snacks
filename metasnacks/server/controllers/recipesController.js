const { Recipes } = require('../models/models');
const uuid = require('uuid')
const path = require('path');
const ApiError = require('../error/ApiError');

class RecipesController {
    async create(req, res, next) {
        try {
            const { count, product_id, ingredient_id } = req.body
            const recipe = await Recipes.create({ product_id, ingredient_id, count })
            return res.json(recipe)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res) {
        let { product_id, ingredient_id, limit, page } = req.query
        page = page || 1
        limit = limit || 100
        let offset = page * limit - limit
        let recepts;
        if (!product_id && !ingredient_id) {
            recepts = await Recipes.findAndCountAll({limit,offset})
        }
        if (!product_id && ingredient_id) {
            recepts = await Recipes.findAndCountAll({ where: { ingredient_id }, limit, offset })
        }
        if (product_id && !ingredient_id) {
            recepts = await Recipes.findAndCountAll({ where: { product_id }, limit, offset })
        }
        if (product_id && ingredient_id) {
            recepts = await Recipes.findAndCountAll({ where: { product_id, ingredient_id }, limit, offset })
        }
        return res.json(recepts)
    }

    async getOne(req, res) {
        const {id} = req.params
        const recipe = await Recipes.findOne(
            {
                where:{id},
                include: [{product_id}]
            }
        )
        return res.json(recipe)
    }
    async deleteOne(req, res) {
        const {id} = req.params
        try {
            const recipes = await Recipes.destroy({
                where: { id }
            });
            if (recipes) {
                // Запись была успешно удалена
                return res.json({ message: 'Recipes deleted successfully' });
            } else {
                // Запись с указанным product_id не была найдена
                return res.status(404).json({ error: 'Recipes not found' });
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new RecipesController()