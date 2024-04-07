const Router = require('express')
const router = new Router()
const OrderController = require('../controllers/orderController')
const authMiddleware = require("../middleware/authMiddleware");

router.patch('/', OrderController.createOrder)
router.get('/',OrderController.getAll)
router.delete('/',OrderController.deleteOne)

module.exports = router