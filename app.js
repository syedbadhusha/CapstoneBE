const express = require('express')
const userRouter = require('./routers/userRoutes')
const cookieParser = require('cookie-parser');
const morgan    =   require('morgan')

const app = express();
app.use(cookieParser());
app.use(morgan());
app.use(express.json());
app.use('/api/users',userRouter)

module.exports= app;