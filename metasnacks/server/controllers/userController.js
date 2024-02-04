const {User,Orders} = require('../models/models')
const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {where} = require("sequelize");

const generateJwt = (id, email, organisation_name, itn, role) => {
   return jwt.sign(
        {id, email, organisation_name, itn, role},
        process.env.SECRET_KEY,
        {expiresIn: '24'}
        )
}

class UserController{
    async registration(req,res,next){
        const {email,organisation_name,itn,password,role} = req.body
        if(!email || !password)
        {
            return next(ApiError.badRequest('Incorrect email or password'))
        }
       const candidate = await User.findOne({where:{email}})
       if(candidate)
       {
        return next(ApiError.badRequest('A user with the same email already exists'))
       }
       const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, organisation_name, itn, password: hashPassword, role})
       // const orders = await Orders.create({user_id: user.user_id})
        const token = generateJwt(user.id, user.email, user.organisation_name, user.itn, user.role)
        return res.json({token})
    }
    async login(req,res,next){
        const {email,password} = req.body
        const user = await User.findOne({where: {email}})
        if(!user)
        {
            return next(ApiError.internal('User not found'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword){
            return next(ApiError.internal('Wrong password'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async check(req,res,next){
     const token = generateJwt(req.user.id, req.user.email, req.user.role)
        res.json({token})
    }
}

module.exports = new UserController()