const Router = require('express')
const router = new Router()
const BasketController = require('../controllers/basketController')
const authMiddleware = require("../middleware/authMiddleware");

router.post('/', BasketController.addToBasket)
router.get('/',BasketController.getBasketUser)
router.delete('/',BasketController.deleteOne)

module.exports = router