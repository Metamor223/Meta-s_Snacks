const Router = require('express')
const router = new Router()
const orderRouter = require('./orderRouter')
const userRouter = require('./userRouter')
const typeRouter = require('./typeRouter')
const warehouseRouter = require('./warehouseRouter')
const receptsRouter = require('./receptsRouter')
const productRouter = require('./productRouter')


router.use('/user', userRouter)
router.use('/orders', orderRouter)
router.use('/product', productRouter)
router.use('/recepts', receptsRouter)
router.use('/type', typeRouter)
router.use('/warehouse', warehouseRouter)

module.exports = router