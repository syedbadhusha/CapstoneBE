const express = require('express')
const cartController = require('../controllers/cartController')
const cartRouter = express.Router()
const auth = require('../middlewares/auth')

cartRouter.post('/',auth.isAuth,cartController.createCart)
cartRouter.put('/additem',auth.isAuth,cartController.addItem)
cartRouter.put('/removeitem',auth.isAuth,cartController.removeItem)
cartRouter.get('/items',auth.isAuth,cartController.fetchCartItem)
cartRouter.put('/statustoordered',auth.isAuth,cartController.cartOrdered)

module.exports = cartRouter;