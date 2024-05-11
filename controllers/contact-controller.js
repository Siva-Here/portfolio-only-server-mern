const Contact=require('../model/contact-model')
const contactForm=async(req,res)=>{
    try{
        const response=await req.body
        await Contact.create(response)
        return res.status(200).json({message:"message send successfully"})
    }
    catch(err){  
        const status=500
        const message="message not delivered"
        const error={status,message}
        next(error)
    }
}
module.exports=contactForm