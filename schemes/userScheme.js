const mongoose = require("mongoose")
const userScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    orders:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:order
    }]
})

const userModel = mongoose.model("order",userScheme)
module.exports =userModel