const {Orders} = require('../models/models')
class OrderController{
    async create(req,res){
        const {user_id,product_id,amount, order_date, price} = req.body
        const order = await Orders.create({user_id,product_id,amount, order_date, price})
        return res.json(order)
    }
    async getAll(req,res){
        const orders = await Orders.findAll()
        return res.json(orders)
    }
    async deleteOne(req,res){
        const {id} = req.params
        try {
            const product = await Orders.destroy({
                where: { id }
            });
            if (product) {
                // Запись была успешно удалена
                return res.json({ message: 'Order deleted successfully' });
            } else {
                // Запись с указанным product_id не была найдена
                return res.status(404).json({ error: 'Order not found' });
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new OrderController()