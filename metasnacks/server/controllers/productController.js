const {Product} = require('../models/models')
class ProductController{
    async create(req,res){
        const {Product_name, type_product, description} = req.body
        const product = await Recepts.create({Product_name, type_product, description})
        return res.json(product)
    }
    async getAll(req,res){
        const products = await Product.findAll()
        return res.json(products)
    }
    async getOne(req,res){

    }
    async deleteOne(req,res){

    }
}

module.exports = new ProductController()