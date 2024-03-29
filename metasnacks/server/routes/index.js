const Router = require('express')
const router = new Router()
const orderRouter = require('./orderRouter')
const userRouter = require('./userRouter')
const typeRouter = require('./typeRouter')
const warehouseRouter = require('./warehouseRouter')
const recipesRouter = require('./recipesRouter')
const productRouter = require('./productRouter')


router.use('/user', userRouter)
router.use('/order', orderRouter)
router.use('/product', productRouter)
router.use('/recipes', recipesRouter)
router.use('/type', typeRouter)
router.use('/warehouse', warehouseRouter)

module.exports = router