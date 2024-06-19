const Order = require('../models/orderModels')
const User = require('../models/userModels')
const orderControllers = {
    createOrder:async(req,res)=>{
        try{
            const userId = req.userInfo.id;
            const userRole = req.userInfo.userRole;
            const {orderDetails} = req.body;
            const user = await User.findById(userId).select('-passwordHash -__v -_id');
            if(!user){
                return res.status(500).json({message:'User Not Found'})
            }
            if(userRole !== 'user'){
                return res.status(500).json({message:`Hi ${user.firstName}, You Don't Have Access`})
            }
            const newOrder = new Order({
                orderDetails
            })
            const createdOrder = await newOrder.save();
            res.status(201).json({message:'Ordered Successfully',order:createdOrder})
        }catch(error){
            res.status(500).json({message:error.message})
        }
      }
    }

    module.exports = orderControllers;