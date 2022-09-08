const mongoose = require("mongoose")
const resturantScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dishes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "dish"
    }
    ],
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "order"
    }
    ],
    revenue: {
        type: Number,
        default:0,
    },



})

const resturantModel = mongoose.model("resturant", resturantScheme)
module.exports = resturantModel