const User = require('../models/userModels')
const bCrypt = require('bcrypt')


const userController = {
    register: async(req,res)=>{
        try{
        const {userName,password,firstName,lastName,deliveryAddress,userRole} = req.body
            const user = await User.findOne({userName})
            if(user){
                return res.status(400).json({message:'user already exist'})
            }
            const passwordHash = await bCrypt.hash(password,10)
            const newUser = new User({
                userName,
                passwordHash,
                firstName,
                lastName,
                deliveryAddress,
                userRole
            })
            const savedUser = await newUser.save();
            res.status(201).json({message:'User Created Successfully',user:savedUser})
        }catch(error){
            res.status(500).json({message:error.message})
        }
    }
}

module.exports = userController;