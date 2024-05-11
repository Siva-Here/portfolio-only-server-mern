const User=require('../model/user-model')
const bcrypt=require('bcrypt')
const home=async(req,res)=>{
    try{
        res.status(200).send("This is my Home Page...")
    }
    catch(err){
        res.send(err)
        console.log(err)
    }
}

const register=async(req,res)=>{ 
    try{
        console.log(req.body)
        const {username,email,phone,password}=req.body
        const user=await User.findOne({email})
        if(user){
            return res.status(400).json({message:"email "+'📧 '+'already exists'})
        }
        else{
            const user=await User.create({username,email,phone,password})
            res.status(200).json({"registered":user,
                          token:await user.generateToken(),
                        userId:user._id.toString()})
        }
    }catch(err){
        console.log(err)
        res.status(400).send(err)
    }
}
 
const login=async(req,res)=>{
    try{
        const {email,password}=req.body
        const userExist=await User.findOne({email})
        if(!userExist){
            return res.status(400).send("Invalid credentials...")
        }
        const pwdMatched=await userExist.comparePassword(password)
        if(pwdMatched){
            res.status(200).json({
                msg:"Login Successful",
                token:await userExist.generateToken(),
                userId:userExist._id.toString()
            })
        }
        else
        {
            res.status(401).json({message:"Invalid email or password..."})
        }
    }
    catch(err){
        console.log(err)
        res.status(500).send("Internal service Error...")
    }
}
module.exports={home,register,login}