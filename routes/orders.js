const express = require("express")
const dishModel = require("../schemes/dishScheme")
const orderModel = require("../schemes/ordersScheme")
const resturantModel = require("../schemes/resturantScheme")
const router = express.Router()
const ObjectId = require('mongodb').ObjectId

router.post('/',async (req,res)=>{
    let {resturant,dish,quantity} = req.body
    if(!resturant||!dish||!quantity){
      return  res.status(400).send("Fields missing")
    }
    let resturantExist = await resturantModel.findOne({name:resturant})
    if(resturantExist===null){
        return  res.status(400).send("No such resturant")
    }
    let dishExist = await dishModel.findOne({name:dish})
    if(dishExist===null){
        return  res.status(400).send("No such dish")
    }
    let order = new orderModel({
        resturant:resturant,
        quantity:quantity,
        dish:dishExist
    })
    let idOfDish =ObjectId(dishExist._id)
    // I can find if this dish is part of dishes of this resturants using id
    // and then display error if resturant does not serves this dish

    // })
    await order.save()
   await resturantModel.findOneAndUpdate({name:resturant},{$push:{orders:order}})
    return  res.status(200).send("Order Added")
})
router.get('/:id',async (req,res)=>{
    let id = req.params.id
    let order = await orderModel.findOne({_id:ObjectId(id)})
    if(order===null){
        return  res.status(400).send("No such order")
    }
    return  res.status(200).send(order)
})

router.post('/:id/update',
async (req,res)=>{
    let {status} = req.body
    if(!status){
        return res.status(400).send("Provide New Status")
    }
    let id = req.params.id
    let order = orderModel.findOne({_id:ObjectId(id)})
    if(order===null){
        return  res.status(400).send("No such order")
    }
   await orderModel.findOneAndUpdate({_id:ObjectId(id)},{$set:{status:status}})
   return  res.status(200).send("Order updated")
})

module.exports = router