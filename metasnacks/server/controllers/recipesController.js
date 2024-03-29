const { Recipes, Warehouse} = require('../models/models');
const uuid = require('uuid')
const path = require('path');
const ApiError = require('../error/ApiError');

class RecipesController {
    async create(req, res, next) {
        try {
            const { IngredientList, name } = req.body
            const recipe = await Recipes.create({name, IngredientList})
            return res.json(recipe)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async check(req,res){
        try {
            const { id } = req.params;

            const recipe = await Recipes.findByPk(id);
            if (!recipe) {
                return res.status(404).json({ message: `Recipe with ID ${id} not found` });
            }

            const IngredientList = recipe.IngredientList;
            if (!IngredientList) {
                return res.status(400).json({ message: "Ingredient list is required" });
            }

            const pairs = IngredientList.split(',').map(pair => pair.trim().split(' '));

           // const parsedIngredientList = JSON.parse(IngredientList);
            const ingredientInfo = [];
            for (const pair of pairs) {
                const [warehouseId, count] = pair;
                const warehouseItemId = parseInt(warehouseId); // Преобразуем строку в число

                const warehouseItem = await Warehouse.findByPk(warehouseItemId);

                if (!warehouseItem) {
                    return res.status(404).json({ message: `Ingredient with ID ${warehouseItemId} not found in the warehouse` });
                }

                if (warehouseItem.count >= parseInt(count)) {
                    ingredientInfo.push({ warehouseId: warehouseItemId, count: warehouseItem.count });
                } else {
                    return res.status(400).json({ message: `Not enough of ingredient with ID ${warehouseItemId} in the warehouse` });
                }
            }
            return res.json(ingredientInfo);
        }
        catch (e)
        {
            res.json({message: e.message})
        }
    }

    async getAll(req, res) {
        const recipes = await Recipes.findAll()
        return res.json(recipes)
    }

    async getOne(req, res) {
        const {id} = req.params
        const recipe = await Recipes.findOne(
            {
                where:{id},
                include: [{id}]
            }
        )
        return res.json(recipe)
    }

    async deleteOne(req, res) {
        const id = parseInt(req.params.id, 10)
        try {
            const recipes = await Recipes.destroy({
                where: { id: id }
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