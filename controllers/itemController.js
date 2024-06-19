const User = require('../models/userModels')
const Item = require('../models/itemModels')
const itemControllers = {
    itemCreate:async(req,res)=>{
        try{
            const {name,description,price,imageSrc} = req.body;
            const userId  = req.userInfo.id;
            const userRole = req.userInfo.userRole;
            const user = await User.findById(userId).select('-passwordHash -__v -_id');
            if(!user){
                return res.status(500).json({message:'User Not Found'})
            }
            if(userRole !== 'admin'){
                return res.status(500).json({message:`Hi ${user.firstName}, You Don't Have Access To Create Item`})
            }
            const newItem = new Item({
                name,
                description,
                price,
                imageSrc
            })
            const savedItem = await newItem.save()
            res.status(201).json({message:'Item Created Successfully',Item:savedItem})
        }catch(error){
            res.status(500).json({message:error.message})
        }
    },
    itemDelete:async(req,res)=>{
        try{
            const {itemId} = req.body._id;
            const userId  = req.userInfo.id;
            const userRole = req.userInfo.userRole;
            const user = await User.findById(userId).select('-passwordHash -__v -_id');
            const selectedItem = await User.findById(itemId)
            if(!user){
                return res.status(500).json({message:'User Not Found'})
            }
            if(userRole !== 'admin'){
                return res.status(500).json({message:`Hi ${user.firstName}, You Don't Have Access To Create Item`})
            }
            await Item.deleteOne(itemId)
            res.status(201).json({message:'Item Deleted Successfully'})
        }catch(error){
            res.status(500).json({message:error.message})
        }
    },
    itemUpdate:async(req,res)=>{
        try{
            const {itemId,name,description,price,imageSrc} = req.body
            const userId  = req.userInfo.id;
            const userRole = req.userInfo.userRole;
            const user = await User.findById(userId).select('-passwordHash -__v -_id');
            const selectedItem = await User.findById(itemId)
            if(!user){
                return res.status(500).json({message:'User Not Found'})
            }
            if(userRole !== 'admin'){
                return res.status(500).json({message:`Hi ${user.firstName}, You Don't Have Access To Create Item`})
            }
            await Item.updateOne({itemId},{$set:{name,description,price,imageSrc}})
            res.status(201).json({message:'Item Deleted Successfully'})
        }catch(error){
            res.status(500).json({message:error.message})
        }
    },
    getAllItem:async(req,res)=>{
        try{
            const userId  = req.userInfo.id;
            const userRole = req.userInfo.userRole;
            const user = await User.findById(userId).select('-passwordHash -__v -_id');
            if(!user){
                return res.status(500).json({message:'User Not Found'})
            }
            if(userRole !== 'user'){
                return res.status(500).json({message:`Hi ${user.firstName}, You Don't Have Access To Get Item`})
            }
            const itemList = await Item.find()
            res.status(201).json(itemList)
        }catch(error){
            res.status(500).json({message:error.message})
        }
    }
}

module.exports = itemControllers;