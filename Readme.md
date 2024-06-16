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
        - Update User or Create User - 'POST /api/user'
        - Sending Activation Mail - 'POST /api/user/activatemail'
        - Update Activation flag - 'POST /api/user/activate'
    -- Forgot Password
        - Validate User - 'POST /api/user/uservalidate:id'
        - Sending OTP Via Mail - 'POST /api/user/sendotp:id'
        - Validate OTP - 'POST /api/user/vaidateotp:id'
        - Update New Password - 'POST /api/user/updatenewpassword:id'
    -- Login
        - Validate user - 'POST /api/user/login:id'
    -- LogOut
        - Closing Session - 'POST /api/user/logout:id'
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
    
