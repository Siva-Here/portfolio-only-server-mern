const {z} =require('zod')

const signupSchema=z.object({
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
    phone:z
        .string({required_error:"Phone number is required..."})
        .trim()
        .min(10,{message:"Phone Number must atleast of 10 characters"})
        .max(20,{message:"Phone Number must not be more than of 20 characters"}),
    password:z
        .string({required_error:"Password is required..."})
        .min(7,{message:"Password must be atleast of 6 characters..."})
        .max(1024,"Password cant be greater than 1024 characters...")
})



const loginSchema=z.object({
    email:z
        .string({required_error:"Email is required..."})
        .trim()
        .email({message:"Invalid Email address"})
        .min(3,{message:"Email must be atleast 3 characters..."})
        .max(255,{message:"Email must not be more than 255 characters..."}),
    password:z
        .string({required_error:"Password is required..."})
        .min(7,{message:"Password must be atleast of 6 characters..."})
        .max(1024,"Password cant be greater than 1024 characters...")
})

module.exports={signupSchema,loginSchema}