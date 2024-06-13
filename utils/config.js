require('dotenv').config()
const MongoDB_URI = process.env.MONGOOSE_URI;
const PORT  = process.env.PORT;
module.exports = {
    MongoDB_URI,PORT
}