const express = require('express');
const userRouter = require('./routers/userRoutes');
const cookieParser = require('cookie-parser');
const morgan    =   require('morgan');
const cartRouter = require('./routers/cartRouters')
const itemRouter = require('./routers/ItemRouters')

const app = express();
app.use(cookieParser());
app.use(morgan());
app.use(express.json());
app.use('/api/users',userRouter)
app.use('/api/carts',cartRouter)
app.use('/api/items',itemRouter)

module.exports= app;