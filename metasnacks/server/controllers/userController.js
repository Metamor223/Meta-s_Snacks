const {User,Orders, Basket} = require('../models/models')
const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {where} = require("sequelize");

const generateJwt = (id, email, contactName, role) => {
   return jwt.sign(
        {id, email, contactName, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
        )
}

class UserController{
    async registration(req,res,next){
        const {email, contactName, password} = req.body
        const role = 'MANAGER'
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
        const user = await User.create({email, contactName, password: hashPassword, role})
        const token = generateJwt(user.id, user.email, user.contactName, user.role)
        return res.json({token})
    }

    async AddCustomer (req,res){
        const {organisation_name, contactName, comeFrom, phoneNumber, role} = req.body
        const user = await User.create({comeFrom, organisation_name, contactName, phoneNumber, role})
        return res.json({user})
    }

    async login(req,res,next){
        const {email,contactName,password} = req.body
        const user = await User.findOne({where: {email}})
        if(!user)
        {
            return next(ApiError.internal('User not found'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword){
            return next(ApiError.internal('Wrong password'))
        }
        const token = generateJwt(user.id, user.email, user.contactName ,user.role)
        return res.json({token})
    }

    async check(req,res,next){
        const token = generateJwt(req.user.id, req.user.email, req.user.contactName, req.user.role)
        return res.json({token})
    }

    async getAllUsers(req,res){
        let {role} = req.body
        if(!role) {
            role = 'USER';
        }
            const users = await User.findAll({
                where:
                    {role: role}
            })
            return res.json({users})
    }

    async getManagers(req,res){
        let {role} = req.body
        if(!role) {
            role = 'MANAGER';
        }
        const users = await User.findAll({
            where:
                {role: role}
        })
        return res.json({users})
    }
}

module.exports = new UserController()