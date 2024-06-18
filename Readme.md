## Packages used

    -- Server Nodejs
    -- Database Mongodb

## Node packages

    -- Expressjs
    -- Router
    -- MongoDb
    -- Mongoose
    -- Cors
    -- Nodemon
    -- Dot ENV
    -- Bcrypt

## Setup
    -- npm init

## API END POINTS

    -- Registration
        - Update User or Create User and send Activation mail - 'POST /api/users'
        - Activate User - 'PUT /api/users/useractivation'
    -- Forgot Password
        - Sending OTP Via Mail and valdate UserName- 'POST /api/users/sendforgotmail'
        - Update New Password - 'POST /api/user/resetPassword'
    -- Login
        - Current User - 'GET /api/users/currentuser'
        - Login user and Create Token- 'POST /api/users/login'
    -- LogOut
        - Delete Cookie and Logout - 'GET /api/user/logout:id'
    -- Product List
        - Fetching Product List - 'GET /api/user/users'
    -- Cart
        - Fetchin Cart Item - 'GET /api/cart/Items'
        - Add Item - 'POST /api/cart/item:itemid'
        - Remove Item - 'POST /api/cart/item:cartitemid'
    -- Orders
        - Place Order - 'POST /api/order'
        - Update delivery Details - 'POST /api/order/updateaddress:orderid'
    -- Payments
        - Validate User
    
