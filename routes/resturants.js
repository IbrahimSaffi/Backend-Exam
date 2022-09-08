const express = require("express")
const dishModel = require("../schemes/dishScheme")
const orderModel = require("../schemes/ordersScheme")
const resturantModel = require("../schemes/resturantScheme")
const router = express.Router()
const ObjectId = require('mongodb').ObjectId

router.get('/', async (req, res) => {
    let resturants = await resturantModel.find({})
    if (resturants.length === 0) {
        return res.status(400).send("No Resturants")
    }
    return res.status(200).send(resturants)
})

router.post('/', async (req, res) => {
    const { name } = req.body
    if (!name) {
        return res.status(400).send("Provide name of resturant")
    }
    let resturantExist = await resturantModel.findOne({ name: name })
    if (resturantExist !== null) {
        return res.status(400).send("Resturant Already exists")
    }
    const resturant = new resturantModel({
        name: name
    })
    await resturant.save()
    return res.status(200).send("Resturant Added")
})

router.get('/:id', async (req, res) => {
    let id = req.params.id
    let resturant = await resturantModel.findOne({ _id: ObjectId(id) })
    if (resturant === null) {
        return res.status(400).send("No Such Resturants")

    }
    return res.status(200).send(resturant)


})
router.delete('/:id', async (req, res) => {
    let id = req.params.id
    let resturant = await resturantModel.findOne({ _id: ObjectId(id) })
    if (resturant === null) {
        return res.status(400).send("No Such Resturants")
    }
    await resturantModel.findOneAndDelete({ _id: ObjectId(id) })
    return res.status(400).send("Resturant Succesfuly deleted")


})
router.post('/:id/add-dish', async (req, res) => {
    const { name, price } = req.body
    if (!name) {
        return res.status(400).send("Provide both name and price of dish")
    }
    let id = req.params.id
    try {
        //Alternatively instead of try Object(id) can be used directly Not changing code due to time although this also working
        let resturant = await resturantModel.findOne({ _id: id }, { dish: 1 })
        let dish = new dishModel({
            name: name,
            price: price
        })
        await dish.save()
        // dish already exist functionality remaining
        await resturant.updateOne({ $push: { dishes: dish } })
        return res.status(200).send("Dish Added")
    }
    catch (err) {
        return res.status(400).send("No Such Resturants")
    }
})
router.get('/:id/orders', async (req, res) => {
    let id = req.params.id
    try {
        //Alternatively instead of try, Object(id) can be used directly Not changing code due to time although this also is working
        let resturant = await resturantModel.findOne({ _id: id }, { orders: 1 })
        let orderId = resturant.orders.map(ele => {
            return ele._id.toString()
        })
        if (req.query.hasOwnProperty("filter")) {
            console.log("here")
            let status = req.query.filter
            let orders = await orderModel.find({ status: status })
            console.log(orders)
            orders = orders.filter(ele => {
                console.log(ele)
                if (orderId.includes(ele._id.toString())) {
                    return ele
                }
            })
            return res.status(200).send(orders)
        }
        else {
            let orders = await orderModel.find({})
            orders = orders.filter(ele => {
                if (orderId.includes(ele._id.toString())) {
                    return ele
                }
            })
            return res.status(200).send(orders)
        }

    }
    catch (err) {
        return res.status(400).send("No Such Resturants")
    }
})

router.get('/:id/revenue', async (req, res) => {
    //Leaving it incomplete because of time 
    let id = req.params.id
    let resturant = await resturantModel.findOne({ _id: ObjectId(id) })
    if (resturant === null) {
        return res.status(400).send("No Such Resturants")
    }
    let orderId = resturant.orders.map(ele => {
        return ele._id.toString()
    })
    //Getting all completed orders
    let orders = await orderModel.find({status:"completed"})
    //Filtering all order to include orders of this resturant only
    orders = orders.filter(ele => {
        if (orderId.includes(ele._id)) {
            return ele
        }
    })
    // Then I can used ids of this orders to get time and filter according to provided filter 
    // and prices of every filterd order's dish using dish scheme
    //then I can calculate by total revenue using prices and quantity
    let totalRev = 0
    dishes = await dishModel.find({})

    return res.status(200).send(totalRev)


})
module.exports = router