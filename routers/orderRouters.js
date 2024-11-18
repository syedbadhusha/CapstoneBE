const express = require('express')
const orderControllers = require('../controllers/orderController')
const orderRouter = express.Router()
const auth = require('../middlewares/auth')

orderRouter.post('/',auth.isAuth,orderControllers.createOrder)

module.exports = orderRouter;
