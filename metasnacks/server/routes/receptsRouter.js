const Router = require('express')
const router = new Router()
const ReceptController = require('../controllers/receptsController')

router.post('/',ReceptController.create)
router.get('/',ReceptController.getAll)
router.get('/:id',ReceptController.getOne)
router.delete('/',ReceptController.deleteOne)

module.exports = router