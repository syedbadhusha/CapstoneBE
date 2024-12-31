const mongoose = require('mongoose')
const {ObjectId} = require('mongodb')

const cartSchema = new mongoose.Schema({
    date:{
        type:Date,
        default: () => new Date(),
    },
    items:{
        type:Array,
        default:[]
    },
    cartStatus:{
        type:String,
        enum:['Pending','Ordered'],
        default:'Pending'
    },
    userId:ObjectId
})

module.exports = mongoose.model('Cart',cartSchema,'carts');