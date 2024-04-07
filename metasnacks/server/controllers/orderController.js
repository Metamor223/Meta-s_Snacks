const {Orders, Product} = require('../models/models')
class OrderController{
    async createOrder(req,res){
        try {
            const {detailsOrder, detailsCart, order_date, price, issued, userId} = req.body
            const {cart} = req.params;
                const [_,[updatedOrder]] = await Orders.update(
                    {
                        detailsOrder,
                        detailsCart,
                        order_date,
                        price,
                        issued
                    },
                    {
                        where: {userId: userId},
                        returning: true
                    }
                    );
            if (updatedOrder[0] === 1) {
                return res.json(updatedOrder[1][0]);
            }
        }
        catch (e)
        {
            console.log(e)
        }
    }

    async getAll(req,res){
        try {
            const {issued} = req.params
            if (!issued) {
                const cart = await Orders.findAll(
                    {
                        where: {issued: false},
                    }
                );
                return res.json(cart)
            } else {
                const orders = await Orders.findAll(
                    {
                        where: {issued: true},
                    }
                );
                return res.json(orders)
            }
        }
        catch (e) {
            return res.json(e)
        }
    }

    //переписать метод на "из разряда PATCH после удаления записи из CartDetails"
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