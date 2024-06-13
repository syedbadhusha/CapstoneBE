const mongoose = require('mongoose')
const config   = require('./utils/config')
const app = require('./app')

console.log('Connection to MongoDB...')
mongoose.connect(config.MongoDB_URI).then(()=>{
    console.log('Connected to MongoDB')
    app.listen(config.PORT,()=>{
        console.log(`Server Running on ${config.PORT}`)
    })
}).catch((error)=>{
    console.log('Error Connecting MongoDB...', error.message)
})