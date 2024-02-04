const {Product, Recipes} = require('../models/models')
const uuid = require('uuid')
const path = require('path');
const ApiError = require('../error/ApiError');

class ProductController{
    async create(req, res, next) {
        try {
            const {product_id, Product_name, type_product,description} = req.body
            const recipe = await Recipes.create({product_id, Product_name, type_product, description})
            return res.json(recipe)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req,res,next){
        let { type_id, limit, page } = req.query
        page = page || 1
        limit = limit || 100
        let offset = page * limit - limit
        let recipes;
        if (!type_id) {
            recipes = await Recipes.findAndCountAll({limit,offset})
        }
        if (type_id) {
            recipes = await Recipes.findAndCountAll({ where: { type_id }, limit, offset })
        }
        return res.json(recipes)
    }
    async getOne(req,res){
        const {product_id} = req.params
        const product = await Product.findOne(
            {
                where:{product_id},
                include: [{model: Product, as: 'description'}]
            }
        );
        return res.json(product)
    }
    async deleteOne(req,res){

    }
}

module.exports = new ProductController()