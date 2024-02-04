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

    }
}

module.exports = new OrderController()