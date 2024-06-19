const mongoose = require('mongoose');
const mongodb = require('mongodb')
const orderSchema = mongoose.Schema({
    userId:mongodb.ObjectId,
    deleveryAddress:String,
    orderDate:{
        type:Date,
        default:Date()
    },
    orderNo:String,
    items:Array,
    paymentStatus:{
        type:String,
        enum:['paid','pending']
    },
    payBy:String
})

module.exports= mongoose.model('Order',orderSchema,'orders')