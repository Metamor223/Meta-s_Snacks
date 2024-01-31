const uuid = require('uuid')
const path = require('path');
const {Recepts} = require('../models/models');
const ApiError = require('../error/ApiError');

class ReceptsController{
    async create(req,res,next){
        try{
        const {count} = req.body
        const {image_path} = req.files
        let fileName = uuid.v4() + ".jpg"
        image_path.mv(path.resolve(__dirname, '..', fileName))
        const recept = await Recepts.create({count, image_path: fileName})
        return res.json(recept)
        }
        catch(e){
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req,res){
        const recepts = await Recepts.findAll()
        return res.json(recepts)
    }
    async getOne(req,res){

    }
    async deleteOne(req,res){

    }
}

module.exports = new ReceptsController()