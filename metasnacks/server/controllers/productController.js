const {Product} = require('../models/models')
const uuid = require('uuid')
const path = require('path');
const ApiError = require('../error/ApiError');

class ProductController{
    async create(req, res, next) {
        try {
            const {Product_name, description,price, typeofproductId} = req.body
            const {image_path} = req.files
            let fileName = uuid.v4() + ".jpg"
            image_path.mv(path.resolve(__dirname, '..', 'static', fileName))
            const product = await Product.create({Product_name, image_path: fileName, description, price,typeofproductId})
            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async change(req,res,next){
        try {
            const {product_id, Product_name, typeofproductId,description,price} = req.body
            const {image_path} = req.files
            let fileName = uuid.v4() + ".jpg"
            image_path.mv(path.resolve(__dirname, '..', 'static', fileName))
            const [updatedCount, updatedProduct] = await Product.update(
                {
                    Product_name,
                    image_path: fileName,
                    typeofproductId,
                    description,
                    price
                },
                {
                    where: {id: product_id},
                    returning: true
                }

                );
            if(updatedCount > 0) {
                return res.json(updatedProduct)
            }
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req,res){
        let { typeofproductId, limit, page } = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let product;
        if (!typeofproductId) {
            product = await Product.findAndCountAll({limit,offset})
        }
        if (typeofproductId) {
            product = await Product.findAndCountAll({ where: { typeofproductId }, limit, offset })
        }
        return res.json(product)
    }
    async getOne(req,res){
        const {product_id} = req.params
        const product = await Product.findOne(
            {
                where:{product_id},
            }
        );
        return res.json(product)
    }

    async deleteOne(req,res){
        const id = parseInt(req.params.product_id,10)
        try {
            const product = await Product.destroy({
                where: { product_id: id }
            });
            if (product) {
                // Запись была успешно удалена
                return res.json(product);
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
