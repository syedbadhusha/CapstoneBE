require('dotenv').config()
const MongoDB_URI = process.env.MONGOOSE_URI;
const PORT  = process.env.PORT;
const JWT_Secret = process.env.JWT_Secret;
const SenderMailID = process.env.SenderMailID;
const SenderMailPassword = process.env.SenderMailPassword
const SenderName    = process.env.SenderName

module.exports = {
    MongoDB_URI,PORT,JWT_Secret,SenderMailID,SenderMailPassword,SenderName
}