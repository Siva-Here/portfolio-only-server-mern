const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})

userSchema.pre("save",async function(next){
    const user=this
    if(!user.isModified){
        next()
    }
    try{
        
        const saltRound=await bcrypt.genSalt(10)
        const hashedPWD=await bcrypt.hash(user.password,saltRound)
        user.password=hashedPWD
    }
    catch(err){
        next(err)
    }
})

userSchema.methods.generateToken=async function(){
    try{
        return jwt.sign({
            userID:this._id.toString(),
            email:this.email,
            isAdmin:this.isAdmin
        },process.env.SECRET_KEY,{
            expiresIn:'30d'
        })
    }
    catch(err){
        console.error(err)
    }
}

userSchema.methods.comparePassword=async function(password){
    return bcrypt.compare(password,this.password)
}

const User=new mongoose.model("User",userSchema)

module.exports=User