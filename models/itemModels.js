const mongoose = require('mongoose')
const itemSchema = new mongoose.Schema({
    name:String,
    description:String,
    price:Number,
    imageSrc:String
})
module.exports = mongoose.model('Item',itemSchema,'items');