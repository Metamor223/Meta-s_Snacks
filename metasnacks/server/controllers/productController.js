const {Product, Recipes} = require('../models/models')
const uuid = require('uuid')
const path = require('path');
const ApiError = require('../error/ApiError');

class ProductController{
    async create(req, res, next) {
        try {
            const {product_id, Product_name, type_product,description,price} = req.body
            const {image_path} = req.files
            let fileName = uuid.v4() + ".jpg"
            image_path.mv(path.resolve(__dirname, '..', 'static', fileName))
            const product = await Product.create({product_id, Product_name, type_product, description, price,image_path: fileName})
            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req,res){
        let { type_id, limit, page } = req.query
        page = page || 1
        limit = limit || 100
        let offset = page * limit - limit
        let product;
        if (!type_id) {
            product = await Product.findAndCountAll({limit,offset})
        }
        if (type_id) {
            product = await Product.findAndCountAll({ where: { type_id }, limit, offset })
        }
        return res.json(product)
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
        const {product_id} = parseInt(req.params.id,10)
        try {
            const product = await Product.destroy({
                where: { product_id: {product_id} }
            });
            if (product) {
                // Запись была успешно удалена
                return res.json({ message: 'Product deleted successfully' });
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

module.exports = new ProductController()