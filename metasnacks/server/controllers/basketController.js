const { Product, BasketProduct } = require("../models/models")

class BasketController {

    async addToBasket(req,res){
        try {
            const user = req.user
            const {productId, nonEmptyBasket} = req.body
            if (nonEmptyBasket) {
                const basket = await BasketProduct.update({orderId: user.id, productId: productId})
                return res.json(basket)
            } else {
                const basket = await BasketProduct.create({orderId: user.id, productId: productId})
                return res.json(basket)
            }
        }
        catch (e) {
            console.error(e)
        }
    }

    async getBasketUser(req,res){
        try {
            const {id} = req.user
            const basket = await BasketProduct.findAll({
                include: {
                    model: Product
                }, where: {productId: id}
            })
            return res.json(basket)
        }
        catch (e) {
            console.error(e)
        }
    }

    async deleteOne(req,res){
        try {
        const id = parseInt(req.params.id,10)
            const product = await BasketProduct.destroy({
                where: { id: id }
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

module.exports = new BasketController()