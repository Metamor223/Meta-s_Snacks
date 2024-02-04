const Router = require('express')
const router = new Router()
const WarehouseController = require('../controllers/warehouseController')

router.post('/', WarehouseController.create)
router.get('/', WarehouseController.getAll)
router.get('/:id', WarehouseController.getOne)
router.delete('/:id', WarehouseController.deleteOne)

module.exports = router