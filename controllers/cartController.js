const Cart = require('../models/cartModels')
const User = require('../models/userModels')
const mongoose = require('mongoose')
const cartController = {
    createCart: async(req,res)=>{
        try{
            const {items,userId} = req.body;
            const user = await User.findById(userId).select('-passwordHash -__v -_id');
            if(!user){
                return res.status(500).json({message:'User Not Found'})
            }
            if(userRole !== 'user'){
                return res.status(500).json({message:`Hi ${user.firstName}, You Don't Have Access`})
            }
            const newCartDetail = new Cart({
                items,
                userId
            })
            const createdCart = await newCartDetail.save();
            res.status(201).json({message:'Cart Created Successfully',user:createdCart})
        }catch(error){
            res.status(500).json({message:error.message})
        }
    },
    addItem: async(req,res)=>{
        try{
            const {item,userId} = req.body;
            const user = await User.findById(userId).select('-passwordHash -__v -_id');
            if(!user){
                return res.status(500).json({message:'User Not Found'})
            }
            if(userRole !== 'user'){
                return res.status(500).json({message:`Hi ${user.firstName}, You Don't Have Access`})
            }
            const createdCart = await Cart.updateOne({cartStatus:'Pending'},{$push:{items:item}});
            res.status(201).json({message:'Cart Added Successfully',user:createdCart})
        }catch(error){
            res.status(500).json({message:error.message})
        }
    },
    removeItem: async(req,res)=>{
        try{
            const {item,userId} = req.body;
            const user = await User.findById(userId).select('-passwordHash -__v -_id');
            if(!user){
                return res.status(500).json({message:'User Not Found'})
            }
            if(userRole !== 'user'){
                return res.status(500).json({message:`Hi ${user.firstName}, You Don't Have Access`})
            }
            const createdCart = await Cart.updateOne({cartStatus:'Pending'},{$pull:{items:item}});
            res.status(201).json({message:'Item Removed Successfully',user:createdCart})
        }catch(error){
            res.status(500).json({message:error.message})
        }
    },
    fetchCartItem: async(req,res)=>{
        try{
            const {item,userId} = req.body;
            const user = await User.findById(userId).select('-passwordHash -__v -_id');
            if(!user){
                return res.status(500).json({message:'User Not Found'})
            }
            if(userRole !== 'user'){
                return res.status(500).json({message:`Hi ${user.firstName}, You Don't Have Access`})
            }
            const getCart = await Cart.findOne({cartStatus:'Pending'});
            res.status(201).json(getCart)
        }catch(error){
            res.status(500).json({message:error.message})
        }
    },
    cartOrdered:async(req,res)=>{
        try{
            const {item,userId} = req.body;
            const user = await User.findById(userId).select('-passwordHash -__v -_id');
            if(!user){
                return res.status(500).json({message:'User Not Found'})
            }
            if(userRole !== 'user'){
                return res.status(500).json({message:`Hi ${user.firstName}, You Don't Have Access`})
            }
            const changeCartStatus = await Cart.updateOne({cartStatus:'Pending'},{$set:{cartStatus:'Ordered'}});
            res.status(201).json({message:'Cart Items Are Ordered Successfully', Cart:changeCartStatus})
        }catch(error){
            res.status(500).json({message:error.message})
        }
    }
}

module.exports = cartController;