const mongoose = require("mongoose")
const dishScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
})

const dishModel = mongoose.model("dish", dishScheme)
module.exports = dishModel