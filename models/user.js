import mongoose, { Schema } from "mongoose";

const UserModel = Schema({
  firstName:{
    type: String,
    required: true
  },
  lastName:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNo:{
    type: String,
  },
  pincode:{
    type: Number,
  },
  locality:{
    type: String
  },
  address:{
    type: String,
    required: false
  },
  city: {
    type: String,
  },
  state: {
    type: String
  },
  landmark:{
    type: String
  },
  orders: [
    {
      product:{
        type: Object,
        required: true
      },
      orderedAt:{
        type: Date,
        required: true
      },
      status:{
        type: String,
        required: true,
        default: 'ordered'
      },
      deliveredAt:{
        type: String,
      }
    }
  ]

})

 export default  mongoose.model('users', UserModel)
