const Router = require('express')
const router = new Router()
const WarehouseController = require('../controllers/warehouseController')

router.post('/', WarehouseController.create)
router.patch('/', WarehouseController.change)
router.get('/', WarehouseController.getAll)
router.delete('/:id', WarehouseController.deleteOne)

module.exports = router