const Router = require('express')
const router = new Router()
const WarehouseController = require('../controllers/warehouseController')

router.patch('/', WarehouseController.change)
router.get('/', WarehouseController.getAll)

module.exports = router