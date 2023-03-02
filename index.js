import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import User from './Routes/UsersRoute.js'
import cartRouter from './Routes/CartRouter.js'
import orderRouter from './Routes/OrderRoute.js'

const app = express()

app.use(express.json())
app.use(cors())
dotenv.config()
app.use(morgan('common'))
app.use(cookieParser())

const port = process.env.PORT || 4000

mongoose.set('strictQuery', true)
mongoose.connect(process.env.DATA_URL)
  .then(()=>{
    app.listen(port, ()=>console.log(`Server is Running on Port: ${port}`))
  })
  .catch((err)=>console.log(`Error Occured: ${err}`))

app.use('/users', User)

app.use('/cart', cartRouter)

app.use('/orders', orderRouter)