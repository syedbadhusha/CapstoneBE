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
    -- items
        - Create item - 'Post /api/items/create'
        - Delete Item - 'Delete /api/items/delete'
        - Update Item - 'Put /api/items/update'
        - Fetch item  - 'Get /api/items/item'
        - Fetch All Item - 'Get /api/items'
    -- Cart

        - Creating Cart and adding item in cart - 'POST /api/carts'
        - increase qty in specific item - 'POST /api/carts/incrqty'
        - increase qty in specific item - 'POST /api/carts/decrqty'
        - Remove Item - 'POST /api/carts/removeitem'
        - Fetching Cart Item - 'GET /api/carts/Items'
        - change status to ordered 'POST /api/carts/statustoordered'
        - get single cart item - 'GET /api/carts/item' 

    -- Orders
        - Place Order - 'POST /api/orders'
    -- Payments
        - Validate User
    
