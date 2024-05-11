const express=require('express')
const app=express()
require('dotenv').config()
const startDB=require('../db/conn')
const errorMiddleware = require('../middlewares/error-middleware')
const PORT=process.env.PORT||5000

app.use(express.json())
app.use("/api/auth",require('../routes/auth-router'))
app.use("/api/contact",require('../routes/contact-router'))
app.use(errorMiddleware)

startDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on ${PORT}`)
    })
}).catch((err)=>{console.log(err)})