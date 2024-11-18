const {ObjectId} = require('mongodb')
const User = require('../models/userModels')
const Item = require('../models/itemModels')
const itemControllers = {
    itemCreate:async(req,res)=>{
        try{
            const {name,description,price,imageSrc,additional} = req.body;
            const userId  = req.userInfo.id;
            const userRole = req.userInfo.userRole;
            const user = await User.findById(userId).select('-passwordHash -__v -_id');
            if(!user){
                return res.status(500).json({message:'User Not Found'})
            }
            if(userRole !== 'admin'){
                return res.status(500).json({message:`Hi ${user.firstName}, You Don't Have Access`})
            }
            const newItem = new Item({
                name,
                description,
                price,
                imageSrc,
                additional
            })
            const savedItem = await newItem.save()
            res.status(201).json({message:'Item Created Successfully',Item:savedItem})
        }catch(error){
            res.status(500).json({message:error.message})
        }
    },
    itemDelete:async(req,res)=>{
        try{
            const itemId = req.body;
            const userId  = req.userInfo.id;
            const userRole = req.userInfo.userRole;
            const user = await User.findById(userId).select('-passwordHash -__v -_id');
            if(!user){
                return res.status(500).json({message:'User Not Found'})
            }
            if(userRole !== 'admin'){
                return res.status(500).json({message:`Hi ${user.firstName}, You Don't Have Access`})
            }
            const selectedItem = await Item.findById(itemId.itemId)
            // console.log(selectedItem)
            if(!selectedItem){
                return res.status(500).json({message:'Item Not Found'})
            }
            await Item.deleteOne({_id:itemId.itemId})
            res.status(201).json({message:'Item Deleted Successfully'})
        }catch(error){
            res.status(500).json({message:error.message})
        }
    },
    itemUpdate:async(req,res)=>{
        try{
            const {itemId,name,description,price,imageSrc,additional} = req.body
            const userId  = req.userInfo.id;
            const userRole = req.userInfo.userRole;
            const user = await User.findById(userId).select('-passwordHash -__v -_id');
            if(!user){
                return res.status(500).json({message:'User Not Found'})
            }
            if(userRole !== 'admin'){
                return res.status(500).json({message:`Hi ${user.firstName}, You Don't Have Access`})
            }
            const selectedItem = await Item.findById(itemId)
            if(!selectedItem){
                return res.status(500).json({message:'Item Not Found'})
            }
            // console.log(selectedItem)
            await Item.updateOne({_id:new ObjectId(itemId)},{$set:{name,description,price,imageSrc,additional}})
            res.status(201).json({message:'Item Updated Successfully'})
        }catch(error){
            res.status(500).json({message:error.message})
        }
    },
    getItem:async(req,res)=>{
        try{
            const itemId = req.body;
            const item = await Item.findById(itemId.itemId)
            res.status(201).json(item)
        }catch(error){
            res.status(500).json({message:error.message})
        }
    },
    getAllItem:async(req,res)=>{
        try{
            const itemList = await Item.find()
            res.status(201).json(itemList)
        }catch(error){
            res.status(500).json({message:error.message})
        }
    }
}

module.exports = itemControllers;