const Router = require('express')
const router = new Router()
const OrderController = require('../controllers/orderController')
const authMiddleware = require("../middleware/authMiddleware");

router.post('/', OrderController.createOrder)
router.get('/',OrderController.getAll)
router.get('/status',OrderController.getStatuses)
router.post('/status',OrderController.createStatus)
router.put('/',OrderController.EditOrder)

module.exports = router