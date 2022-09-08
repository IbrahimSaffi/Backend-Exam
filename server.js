require("dotenv").config()

const express = require("express")
const {default:mongoose} = require("mongoose")
const authRouter = require("./routes/auth")
const orderRouter = require("./routes/orders")
const resturantsRouter = require("./routes/resturants")
// mongodb+srv://IbrahimSaffi:<password>@resturants-database.dqdusf2.mongodb.net/?retryWrites=true&w=majority
const app = express()
const cors = require("cors")

 mongoose.connect("mongodb+srv://IbrahimSaffi:jmk161651@resturants-database.dqdusf2.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    console.log("Connected to DB")
 }).catch(err=>console.log(err))


// MiddleWarres
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))



//Routes
app.use("/auth",authRouter)
app.use("/resturants",resturantsRouter)
app.use("/order",orderRouter)

// async function authorization(){

// }

app.listen(process.env.PORT||8000)