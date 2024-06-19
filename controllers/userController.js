const User = require('../models/userModels')
const bCrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const config    =   require('../utils/config')
const jwt = require('jsonwebtoken')

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: config.SenderMailID,
      pass: config.SenderMailPassword,
    },    
})
const userController = {
    register: async(req,res)=>{
        const activationLink = req.body.activationLink
        try{
        const {userName,password,firstName,lastName,deliveryAddress} = req.body
            const user = await User.findOne({userName})
            if(user){
                return res.status(400).json({message:'user already exist'})
            }
            const mailing = {
                from: `${config.SenderName}<${config.SenderMailID}>`,
                to: userName,
                subject: "Your Activation link for E - Cart",
                text: `Please find your link here ${activationLink}`,
              };  
              try{
                await transporter.sendMail(mailing)
              }catch(error){
                return res.status(500).json({message:"Please Check your Mail ID"})
              }             
            const passwordHash = await bCrypt.hash(password,10)
            const newUser = new User({
                userName, 
                passwordHash,
                firstName,
                lastName,
                deliveryAddress
            })
            const savedUser = await newUser.save();
            res.status(201).json({message:'User Created Successfully',user:savedUser})
        }catch(error){
            res.status(500).json({message:error.message})
        }
    },
    verifyAccount: async(req,res)=>{
        try{
            const {userName} = req.body
            const user = await User.findOne({userName})
            if(!user){
                return res.status(200).json({message:'Your Account Has Been Expired'})  
            }
            if(user.activated){
              return res.status(200).json({message:'Account Activated Already'})
            }
            const activatedUser = await User.updateOne({userName},{$set:{activated:true}})
            res.status(200).json({message:'User Activated Successfully',user:activatedUser})
        }catch(error){
            res.status(500).json({message:error.message})
        }
    },
    login:async (req,res)=>{   
        try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName });
        if (!user) {
          return res.status(500).json({ message: "User Not Found" });
        }
        const isPasswordCorrect = await bCrypt.compare(
          password,
          user.passwordHash
        );
        if (!isPasswordCorrect) {
          return res.status(500).json({ message: "Invalid Credentials" });
        }
        if (!user.activated){
          return res.status(500).json({ message: "Please Activate Your Account From Activation Link Sent You On Mail" });
        }
        //Generating token
        const token = jwt.sign(
          {
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            id: user._id,
            userRole:user.userRole,
          },
          config.JWT_Secret
        );
        // set token as cookie
        res.cookie("token", token, {
          httpOnly: true,
          sameSite: "none",
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000), //24 hours cookie expiry
          secure:true
        });
        res.status(200).json({ message: "Login successfully", token });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },  
    currentUser:async (req,res)=>{
        try{
            const userId  = req.userInfo.id;
            const user = await User.findById(userId).select('-passwordHash -__v -_id');
            if(!user){
                return res.status(500).json({message:'User Not Found'})
            }
            res.status(200).json(user)
        }catch(error){
            res.status(500).json({message:error.message})
        }
      },
      logOut: async (req,res)=>{
        try{
            res.clearCookie('token')
            res.status(200).json({message:'Logout Successfully'})
        }catch(error){
            res.status(500).json({message:error.message})
        }
      },
      sendFogotMail: async (req,res)=>{
        try{
            const {userName,passwordChangeLink} = req.body
            const user = await User.findOne({userName});
            if(!user){
                return res.status(500).json({message:'User Not Found'});
            }
            if(!user.activated){
                return res.status(500).json({message:'Your Account is Not Activated Check Your Mail To Activate'})
            }
            await User.updateOne({userName},{$set:{passwordChangeLink:passwordChangeLink}})
            const mailing = {
                from: `${config.SenderName}<${config.SenderMailID}>`,
                to: user.userName,
                subject: "Change Your E - Cart Password",
                text: `Please Click here to change ${passwordChangeLink}`,
              };    
              try{
                await transporter.sendMail(mailing);
              }catch(error){
                return res.status(500).json({message:error.message})
              }
              res.status(200).json({message:'Sent Mail For Reset Password'})
        }catch(error){
            res.status(500).json({message:error.message})
        }
      },
      resetPassword:async(req,res)=>{
        try{
            const {userName,newPassword,reEnteredPassword} = req.body
            const user = await User.findOne({userName});
            console.log(user)
            const newPasswordHashed = await bCrypt.hash(newPassword, 10)
            if(!user){
                return res.status(500).json({message:'User Not Found'})
            }
            if(!user.passwordChangeLink){
                return res.status(500).json({message:'Password Reset Process already done'})
            }
            await User.updateOne({userName},{$set:{passwordHash:newPasswordHashed}})
            await User.updateOne({userName},{$unset:{passwordChangeLink:false}})
            res.status(200).json({message:'Password Has been Updated succesfully'})    
        }catch(error){
            res.status(500).json({message:error.message})
        }
    }
}
module.exports = userController;