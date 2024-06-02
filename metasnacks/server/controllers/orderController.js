const {Orders, Product, Status} = require('../models/models')
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

    async getAll(req,res){
        try {
           const orders = Orders.findAll()
           return res.json(orders)
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