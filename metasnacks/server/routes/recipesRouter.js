const Router = require('express')
const router = new Router()
const RecipieController = require('../controllers/recipesController')


router.post('/', RecipieController.create)
router.get('/',RecipieController.getAll)
router.get('/:id',RecipieController.getOne)
router.delete('/',RecipieController.deleteOne)

module.exports = router