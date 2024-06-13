const {Orders, Product, Status, Type} = require('../models/models')
const ApiError = require("../error/ApiError");
class OrderController{
    async createOrder(req,res,next){
        try {
            const {CompanyName, detailsOrder, orderDate, price, statusId} = req.body
                const order = await Orders.create({
                        CompanyName,
                        detailsOrder,
                        orderDate,
                        price,
                        statusId
                    },
                );
            return res.json(order)
        }
        catch (e)
        {
            next(ApiError.badRequest(e.message))
        }
    }

    async EditOrder(req,res,next){
        try {
            const { updates } = req.body;
            const { id, statusId } = updates;

            // Логируем данные ДО обновления
            const orderBeforeUpdate = await Orders.findOne({ where: { id } });
            console.log("Order BEFORE update:", orderBeforeUpdate.get({ plain: true }));

            const [, [updatedOrder]] = await Orders.update(
                { statusId },
                { where: { id }, returning: true, silent: true }
            );

            // Логируем данные ПОСЛЕ обновления
            console.log("Order AFTER update:", updatedOrder.get({ plain: true }));

            return res.json(updatedOrder);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req,res,next){
        try {
            const orders = await Orders.findAll({
                order: [['id', 'ASC']]  // Сортировка по id по возрастанию
            });
            return res.json(orders);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getStatuses(req,res){
        try {
            const status = await Status.findAll()
            return res.json(status)
        }
        catch (e) {
            return res.json(e)
        }
    }

    async createStatus(req,res){
        const {name} = req.body
        const status = await Status.create({name})
        return res.json(status)
    }
}

module.exports = new OrderController()