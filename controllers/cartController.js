const {ObjectId} = require('mongodb')
const Cart = require('../models/cartModels')
const User = require('../models/userModels')
const mongoose = require('mongoose')
const cartController = {
    createOrAddCartItem: async(req,res)=>{
        try{
            const {items} = req.body;
            const userId  = req.userInfo.id;
            const userRole = req.userInfo.userRole;
            const user = await User.findById(userId).select('-passwordHash -__v -_id');
            if(!user){
                return res.status(500).json({message:'User Not Found'})
            }
            if(userRole !== 'user'){
                return res.status(500).json({message:`Hi ${user.firstName}, You Don't Have Access`})
            }
            const selectedCart = await Cart.findOne({$and:[{userId:new ObjectId(userId)},{cartStatus:'Pending'}]})
            if(!selectedCart){
                const newCartDetail = new Cart({
                    items,
                    userId
                })
                const createdCart = await newCartDetail.save();
                res.status(201).json({message:'Cart Created and Item Added Successfully',cart:createdCart})    
            }else{
                const itemAvailinCart =  selectedCart.items.findIndex((item)=>item._id==items._id)
                if(itemAvailinCart !== -1){
                    res.status(201).json({message:'This is cart Item'})        
                }
                else{
                    const updatedCart = await Cart.updateOne({$and:[{userId:new ObjectId(userId)},{cartStatus:'Pending'}]},{$push:{items:items}});
                    res.status(201).json({message:'Item Added Successfully',cart:updatedCart})
                }
            }
        }catch(error){
            res.status(500).json({message:error.message})
        }
    },
    incrQty: async(req,res)=>{
        try{
            const itemId = req.body;
            const userId  = req.userInfo.id;
            const userRole = req.userInfo.userRole;
            const user = await User.findById(userId).select('-passwordHash -__v -_id');
            if(!user){
                return res.status(500).json({message:'User Not Found'})
            }
            if(userRole !== 'user'){
                return res.status(500).json({message:`Hi ${user.firstName}, You Don't Have Access`})
            }
            const selectedCart = await Cart.findOne({$and:[{userId:new ObjectId(userId)},{cartStatus:'Pending'}]})
            if(!selectedCart){
                res.status(201).json({message:'Cart is Note Available',cart:createdCart})    
            }else{
                const itemAvailinCart =  selectedCart.items.findIndex((item)=>item._id==itemId.itemId)
                if(itemAvailinCart !== -1){
                    // const updateField = `items.${itemAvailinCart}.quantity`;
                    // const updateQty = { $inc: { [updateField]: 1 } };
                    const item = selectedCart.items[itemAvailinCart];
                    const newQuantity = item.quantity + 1;
                    const newAmount = newQuantity * parseFloat(item.price)
                    
                    const updateFields = {
                        $set: {
                          [`items.${itemAvailinCart}.quantity`]: newQuantity,
                          [`items.${itemAvailinCart}.amount`]: newAmount
                        }
                      };

                    const updatedCart = await Cart.updateOne(
                        {$and:[{userId:new ObjectId(userId)},{cartStatus:'Pending'}]},
                        updateFields)
                    res.status(201).json({message:'Qty Increased Successfully',cart:updatedCart})        
                }
                else{
                    res.status(201).json({message:'This is Not a cart Item'})
                }
            }
        }catch(error){
            res.status(500).json({message:error.message})
        }
    },  
    decrQty: async(req,res)=>{
        try{
            const itemId = req.body;
            const userId  = req.userInfo.id;
            const userRole = req.userInfo.userRole;
            const user = await User.findById(userId).select('-passwordHash -__v -_id');
            if(!user){
                return res.status(500).json({message:'User Not Found'})
            }
            if(userRole !== 'user'){
                return res.status(500).json({message:`Hi ${user.firstName}, You Don't Have Access`})
            }
            const selectedCart = await Cart.findOne({$and:[{userId:new ObjectId(userId)},{cartStatus:'Pending'}]})
            if(!selectedCart){
                res.status(201).json({message:'Cart is Note Available',cart:createdCart})    
            }else{
                const itemAvailinCart =  selectedCart.items.findIndex((item)=>item._id==itemId.itemId)
                if(itemAvailinCart !== -1){
                    // const updateField = `items.${itemAvailinCart}.quantity`;
                    // const update = { $inc: { [updateField]: -1 } };

                    const item = selectedCart.items[itemAvailinCart];
                    const newQuantity = item.quantity - 1;
                    const newAmount = newQuantity * parseFloat(item.price)
                    
                    const updateFields = {
                        $set: {
                          [`items.${itemAvailinCart}.quantity`]: newQuantity,
                          [`items.${itemAvailinCart}.amount`]: newAmount
                        }
                      };


                    const updatedCart = await Cart.updateOne(
                        {$and:[{userId:new ObjectId(userId)},{cartStatus:'Pending'}]},
                        updateFields)
                    res.status(201).json({message:'This is cart Item',cart:updatedCart})        
                }
                else{
                    res.status(201).json({message:'Qty Decreased Successfully',cart:updatedCart})
                }
            }
        }catch(error){
            res.status(500).json({message:error.message})
        }
    },  
    removeItem: async(req,res)=>{
        try{
            const itemId = req.body;
            const userId  = req.userInfo.id;
            const userRole = req.userInfo.userRole;
            const user = await User.findById(userId).select('-passwordHash -__v -_id');
            if(!user){
                return res.status(500).json({message:'User Not Found'})
            }
            if(userRole !== 'user'){
                return res.status(500).json({message:`Hi ${user.firstName}, You Don't Have Access`})
            }
            const removedItem = await Cart.updateOne({$and:[{userId:new ObjectId(userId)},{cartStatus:'Pending'}]},{$pull:{items:{_id:itemId.itemId}}});
            res.status(201).json({message:'Item Removed Successfully',item:removedItem})
        }catch(error){
            res.status(500).json({message:error.message})
        }
    },
    cartOrdered:async(req,res)=>{
        try{
            const userId = req.userInfo.id
            const userRole = req.userInfo.userRole;
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
    },
    fetchCartItems: async(req,res)=>{
        try{
            const userId = req.userInfo.id
            const userRole = req.userInfo.userRole;
            const user = await User.findById(userId).select('-passwordHash -__v -_id');
            if(!user){
                return res.status(500).json({message:'User Not Found'})
            }
            if(userRole !== 'user'){
                return res.status(500).json({message:`Hi ${user.firstName}, You Don't Have Access`})
            }
            const getCart = await Cart.findOne({$and:[{userId:new ObjectId(userId)},{cartStatus:'Pending'}]});
            res.status(201).json(getCart)
        }catch(error){
            res.status(500).json({message:error.message})
        }
    },
    fetchCartItem: async(req,res)=>{
        try{
            const itemId = req.body;
            const userId = req.userInfo.id
            const userRole = req.userInfo.userRole;
            const user = await User.findById(userId).select('-passwordHash -__v -_id');
            if(!user){
                return res.status(500).json({message:'User Not Found'})
            }
            if(userRole !== 'user'){
                return res.status(500).json({message:`Hi ${user.firstName}, You Don't Have Access`})
            }
            const getCart = await Cart.findOne({$and:[{userId:new ObjectId(userId)},{cartStatus:'Pending'}]});
            const itemAvailinCart =  getCart.items.findIndex((item)=>item._id == itemId.itemId)
            const getCartItem = getCart.items[itemAvailinCart]
            res.status(201).json(getCartItem)
        }catch(error){
            res.status(500).json({message:error.message})
        }
    },
    fetchCartItemTot: async(req,res)=>{
        try{
            const userId = req.userInfo.id
            const userRole = req.userInfo.userRole;
            const user = await User.findById(userId).select('-passwordHash -__v -_id');
            if(!user){
                return res.status(500).json({message:'User Not Found'})
            }
            if(userRole !== 'user'){
                return res.status(500).json({message:`Hi ${user.firstName}, You Don't Have Access`})
            }
            const getCart = await Cart.findOne({$and:[{userId:new ObjectId(userId)},{cartStatus:'Pending'}]});
            const itemAvailinCart =  getCart.items.findIndex((item)=>item._id == itemId.itemId)
            const getCartItem = getCart.items[itemAvailinCart]
            res.status(201).json(getCartItem)
        }catch(error){
            res.status(500).json({message:error.message})
        }
    }
}

module.exports = cartController;