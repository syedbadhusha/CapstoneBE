const express = require('express')
const cartController = require('../controllers/cartController')
const cartRouter = express.Router()
const auth = require('../middlewares/auth')

cartRouter.post('/',auth.isAuth,cartController.createOrAddCartItem)
cartRouter.post('/incrqty',auth.isAuth,cartController.incrQty)
cartRouter.post('/decrqty',auth.isAuth,cartController.decrQty)
cartRouter.post('/removeitem',auth.isAuth,cartController.removeItem)
cartRouter.get('/items',auth.isAuth,cartController.fetchCartItems)
cartRouter.post('/statustoordered',auth.isAuth,cartController.cartOrdered)
cartRouter.post('/item',auth.isAuth,cartController.fetchCartItem)
cartRouter.post('/total',auth.isAuth,cartController.fetchCartItemTot)

module.exports = cartRouter;