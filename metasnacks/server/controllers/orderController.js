const {Orders} = require('../models/models')
class OrderController{
    async create(req,res){
        {user_id,product_id,amount, order_date, price}
        const order = await TypeOfProduct.create({user_id,product_id,amount, order_date, price})
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