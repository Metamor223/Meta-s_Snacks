const Router = require('express')
const router = new Router()
const ProductController = require('../controllers/productController')

router.post('/', ProductController.create)
router.patch('/', ProductController.change)
router.get('/', ProductController.getAll)
router.get('/:product_id', ProductController.getOne)
router.delete('/:product_id', ProductController.deleteOne)

module.exports = router