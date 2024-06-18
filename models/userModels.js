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
    deliveryAddress:{
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