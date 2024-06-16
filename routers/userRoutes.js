const express = require('express')
const userController = require('../controllers/userController')
const userRouter = express.Router()

userRouter.post('/',userController.register)
module.exports = userRouter;