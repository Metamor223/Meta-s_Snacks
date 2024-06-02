const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')
const authMiddleware = require('../middleware/authMiddleware')

// Получить корзину пользователя (требуется авторизация)
//router.get('/', basketController.getBasket)

// Добавить товар в корзину (требуется авторизация)
//router.post('/', basketController.addToBasket)

// Удалить товар из корзины (требуется авторизация)
//router.delete('/', basketController.deleteFromBasket)

module.exports = router