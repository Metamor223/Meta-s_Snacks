const { Recipes } = require('../models/models');
const uuid = require('uuid')
const path = require('path');
const ApiError = require('../error/ApiError');

class RecipesController {
    async create(req, res, next) {
        try {
            const { count, product_id, ingredint_id } = req.body
            const { image_path } = req.files
            let fileName = uuid.v4() + ".jpg"
            image_path.mv(path.resolve(__dirname, '..', fileName))
            const recipe = await Recipes.create({ product_id, ingredint_id, count, image_path: fileName })
            return res.json(recipe)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res) {
        let { product_id, ingredint_id, limit, page } = req.query
        page = page || 1
        limit = limit || 100
        let offset = page * limit - limit
        let recepts;
        if (!product_id && !ingredint_id) {
            recepts = await Recipes.findAndCountAll({limit,offset})
        }
        if (!product_id && ingredint_id) {
            recepts = await Recipes.findAndCountAll({ where: { ingredint_id }, limit, offset })
        }
        if (product_id && !ingredint_id) {
            recepts = await Recipes.findAndCountAll({ where: { product_id }, limit, offset })
        }
        if (product_id && ingredint_id) {
            recepts = await Recipes.findAndCountAll({ where: { product_id, ingredint_id }, limit, offset })
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
    }
    async deleteOne(req, res) {

    }
}

module.exports = new RecipesController()