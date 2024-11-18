const mongoose = require('mongoose')

// Create Schema
const userSchema = mongoose.Schema({
    userName:String,
    passwordHash:String,
    firstName:String,
    lastName:String,
    activated:{
        type:Boolean,
        default:false
    },
    passwordChangeLink:String,
    deliveryAddress1:{
        type:String,
        default:'Unknown'
    },
    deliveryAddress2:{
        type:String,
        default:'Unknown'
    },
    deliveryAddress3:{
        type:String,
        default:'Unknown'
    },
    deliveryAddress4:{
        type:String,
        default:'Unknown'
    },
    pincode:{
        type:String,
        default:'Unknown'
    },

    userRole:{
        type:String,
        enum:['admin','user'],
        default:'user'
    }
})

module.exports = mongoose.model('User',userSchema,'users');