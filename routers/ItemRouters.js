const express = require('express');
const itemRouter = express.Router();
const itemControllers = require('../controllers/itemController')
const auth = require('../middlewares/auth')

itemRouter.post('/create',auth.isAuth,itemControllers.itemCreate)
itemRouter.delete('/delete',auth.isAuth,itemControllers.itemDelete)
itemRouter.put('/update',auth.isAuth,itemControllers.itemUpdate)
itemRouter.post('/',auth.isAuth,itemControllers.getAllItem)

module.exports = itemRouter;