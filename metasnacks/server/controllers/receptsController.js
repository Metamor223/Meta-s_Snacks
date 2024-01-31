const uuid = require('uuid')
const path = require('path');
const { Recepts } = require('../models/models');
const ApiError = require('../error/ApiError');

class ReceptsController {
    async create(req, res, next) {
        try {
            const { count, product_id, ingredint_id } = req.body
            const { image_path } = req.files
            let fileName = uuid.v4() + ".jpg"
            image_path.mv(path.resolve(__dirname, '..', fileName))
            const recept = await Recepts.create({ product_id, ingredint_id, count, image_path: fileName })
            return res.json(recept)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res) {
        let { product_id, ingredint_id, limit, page } = req.query
        page = page || 1
        limit = limit || 100
        let offset = page * limit - limit
        let recepts;
        if (!product_id && !ingredint_id) {
            recepts = await Recepts.findAndCountAll({limit,offset})
        }
        if (!product_id && ingredint_id) {
            recepts = await Recepts.findAndCountAll({ where: { ingredint_id }, limit, offset })
        }
        if (product_id && !ingredint_id) {
            recepts = await Recepts.findAndCountAll({ where: { product_id }, limit, offset })
        }
        if (product_id && ingredint_id) {
            recepts = await Recepts.findAndCountAll({ where: { product_id, ingredint_id }, limit, offset })
        }
        return res.json(recepts)
    }
    async getOne(req, res) {
        const {id} = req.params
        const recept = await Recepts.findOne(
            {
                where:{id},
                include: [{product_id}]
            }
        )
    }
    async deleteOne(req, res) {

    }
}

module.exports = new ReceptsController()