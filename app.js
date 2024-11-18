const express = require('express');
const userRouter = require('./routers/userRoutes');
const cookieParser = require('cookie-parser');
const morgan    =   require('morgan');
const cartRouter = require('./routers/cartRouters')
const itemRouter = require('./routers/ItemRouters');
const orderRouters = require('./routers/orderRouters');

const app = express();
const cors = require('cors');
const whitelist = ['http://localhost:5173']
app.use(cors(
    {
        origin(reqOrigin, callback){
            if(reqOrigin && whitelist.indexOf(reqOrigin) != -1){
                callback(null, true)
            }else{
                callback(null, true)
            }
        },
        credentials:true
    }
));

app.use(cookieParser());
app.use(morgan());
app.use(express.json());
app.use('/api/users',userRouter)
app.use('/api/carts',cartRouter)
app.use('/api/items',itemRouter)
app.use('/api/orders',orderRouters)
module.exports= app;