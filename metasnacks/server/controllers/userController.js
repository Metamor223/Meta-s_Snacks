const {User} = require('../models/models')
const ApiError = require('../error/ApiError');
class UserController{
    async registration(req,res){
        const {login,organiastion_name,itn,password} = req.body
        const user = await User.create({login,organiastion_name,itn,password})
        return res.json(user)
    }
    async login(req,res){

    }
    async check(req,res,next){
         const {id} = req.query
        if(!id){
            return next(ApiError.badRequest('Не задан ID'))
        }
        res.json(id)
    }
}

module.exports = new UserController()