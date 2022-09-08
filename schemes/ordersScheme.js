const mongoose = require("mongoose")
const orderScheme = new mongoose.Schema({
    resturant: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    },
    dish: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "dish"
    },
    quantity: {
        type: Number,
        required: true
    },
    placedAt: {
        type: Date,
        default: Date.now()
    }
})

const orderModel = mongoose.model("order", orderScheme)
module.exports = orderModel