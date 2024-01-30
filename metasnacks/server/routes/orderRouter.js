const Router = require('express')
const router = new Router()
const OrderController = require('../controllers/orderController')

router.post('/',OrderController.create)
router.get('/',OrderController.getAll)
router.delete('/',OrderController.deleteOne)

module.exports = router