const express = require('express')
const userController = require('../controllers/userController')
const userRouter = express.Router()
const auth = require('../middlewares/auth')

userRouter.post('/',userController.register)
userRouter.put('/useractivation',userController.verifyAccount)
userRouter.post('/login',userController.login)
userRouter.get('/currentuser',auth.isAuth,userController.currentUser)
userRouter.get('/logout',auth.isAuth,userController.logOut)
userRouter.post('/sendforgotmail',userController.sendFogotMail)
userRouter.put('/resetPassword',userController.resetPassword)

module.exports = userRouter;