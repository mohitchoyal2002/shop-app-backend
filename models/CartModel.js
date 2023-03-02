import mongoose from 'mongoose'

const cartModel = new mongoose.Schema({
  email:{
    type: String,
    required: true
  },
  cart: [
    {
      type: Object,
      required: true
    }
  ]
})

export default mongoose.model('cart', cartModel)