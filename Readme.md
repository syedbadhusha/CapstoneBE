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
        - Fetch All Item - 'Get /api/items'
    -- Cart

        - Creating Cart - 'POST /api/cart/'
        - Fetching Cart Item - 'GET /api/cart/Items'
        - Add Item - 'PUT /api/cart/additem'
        - Remove Item - 'PUT /api/cart/removeitem'
        - change status to ordered 'PUT /api/cart/statustoordered'

    -- Orders
        - Place Order - 'POST /api/orders'
    -- Payments
        - Validate User
    
