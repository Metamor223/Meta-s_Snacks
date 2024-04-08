const Router = require('express')
const router = new Router()
const orderRouter = require('./orderRouter')
const userRouter = require('./userRouter')
const typeRouter = require('./typeRouter')
const warehouseRouter = require('./warehouseRouter')
const recipesRouter = require('./recipesRouter')
const productRouter = require('./productRouter')
const basketRouter = require('./basketRouter')
const fileRouter = require('./fileRouter')

router.use('/user', userRouter)
router.use('/basket', basketRouter)
router.use('/order', orderRouter)
router.use('/product', productRouter)
router.use('/recipes', recipesRouter)
router.use('/type', typeRouter)
router.use('/file', fileRouter)
router.use('/warehouse', warehouseRouter)


module.exports = router