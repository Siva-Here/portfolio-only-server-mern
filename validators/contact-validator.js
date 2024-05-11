const {z} =require('zod')

const contactSchema=z.object({
    username:z
        .string({required_error:"Name is required..."})
        .trim()
        .min(3,{message:"Name must be atleast 3 characters..."})
        .max(255,{message:"Name must not be more than 255 characters..."}),
    email:z
        .string({required_error:"Email is required..."})
        .trim()
        .email({message:"Invalid Email address"})
        .min(3,{message:"Email must be atleast 3 characters..."})
        .max(255,{message:"Email must not be more than 255 characters..."}),
    message:z
        .string({required_error:"Message is required..."})
        .trim()
        .min(10,{message:"Message must be atleast of 10 characters"})
        .max(255,{message:"Message must not be more than of 255 characters"}),
})

module.exports=contactSchema