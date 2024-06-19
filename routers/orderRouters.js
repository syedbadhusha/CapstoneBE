const express = require('express')
const orderControllers = require('../controllers/orderController')
const orderRouter = express.Router()

orderRouter.post('/',orderControllers.createOrder)

module.exports = orderRouter;
