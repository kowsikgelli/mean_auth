const passport = require('passport');
const User = require('../models/userModel')

exports.register = async (req,res,next)=>{
    console.log("entered register")
    const {username,email,password} = req.body;
    console.log(req.body)
    try{
        const user = await User.create({
            username,
            email,
            password
        })
        console.log("exited register")
        res.send({success:true,message:"Registration Succesful"})
    }catch(err){
        res.send({success:false,message:"user registraion failed",err:err.message})
    }
}

exports.authenticate = async (req,res,next)=>{
    console.log("entered authenticate")
    const {email , password} = req.body;
    console.log(req.body)
    console.log(password);
    try{
        const user = await User.findOne({email:email});
        if(!user){
            res.send({success:false,message:`${email} is not registered`})
            return
        }
        const isMatch = await user.matchpassword(password);
        if(isMatch){
            const token = user.getSignedToken();
            console.log("exited autheticate")
            res.send({
                success:true,
                message:'JWT '+token,
                user:{
                    id:user._id,
                    username:user.username,
                    email:user.email,
                    password:user.password
                }
            })
        }else{
            res.send({success:false,message:"Invalid Password"})
        }
    }catch(err){
        console.log(err.message)
        res.send({success:false,message:"error finding user"})
    }
}

exports.socialLogin = async(req,res,next)=>{
    const {email,password,username} = req.body
    console.log("entered social login")
    console.log(req.body)
    try{
        let user = await User.findOne({email:email});
        if(!user){
            const user = await User.create({
                username,
                email,
                password
            })
        }
        user = await User.findOne({email:email})
        const isMatch = await user.matchpassword(password);
        if(isMatch){
            const token = user.getSignedToken();
            res.send({
                success:true,
                message:'JWT '+token,
                user:{
                    id:user._id,
                    username:user.username,
                    email:user.email,
                    password:user.password
                }
            })
        }else{
            res.send({success:false,message:"Invalid Social Credentials"})
        }
    }catch(err){
        res.send({success:false,message:"user social login failed",err:err.message})
    }
}

exports.profile = async (req,res)=>{
    console.log("entered profile")
    res.send({success:true,user:req.user})
}