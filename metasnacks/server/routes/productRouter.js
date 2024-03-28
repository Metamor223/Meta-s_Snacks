const Router = require('express')
const router = new Router()
const ProductController = require('../controllers/productController')
const authMiddleware = require("../middleware/authMiddleware");

router.post('/', authMiddleware, ProductController.create)
router.patch('/', authMiddleware, ProductController.change)
router.get('/', ProductController.getAll)
router.get('/:product_id', ProductController.getOne)
router.delete('/:product_id', authMiddleware, ProductController.deleteOne)

module.exports = router