import userModel from "../models/user.js"

export const placeOrder = async(req, res)=>{
  const {email, pincode, locality, address, city, state, landmark} = req.body
  try{
    await userModel.updateOne({email},{pincode, locality, address, city, state, landmark})
    const user = await userModel.findOne({email})
    if(!user){
      res.status(400).json("User not found")
    }
    else{
      const newOrder = {
        product: req.body.product,
        orderedAt: Date.now()
      }
      user.orders.push(newOrder)
      await user.save()
    }
    res.json("Order Placed")
  }
  catch(err){
    console.log(err);
    res.status(500).json("Something went wrong")
  }
}

export const fetchOrders = async(req, res)=>{
  const {email} = req.params
  try{
    const user = await userModel.findOne({email});
    if(!user){
      res.status(400).json("user not found")
    }
    else{
      const orders = user.orders
      res.json(orders)
    }
  }
  catch(err){
    res.status(500).json("Something went wrong")
  }
}