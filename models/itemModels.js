const mongoose = require('mongoose')
const itemSchema = new mongoose.Schema({
    name:String,
    description:String,
    price:String,
    imageSrc:String,
    additional:String
})
module.exports = mongoose.model('Item',itemSchema,'items');