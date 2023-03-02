import express from 'express'
import { addToCart, fetchCart } from '../controllers/cart.js'
import { validateUserToken } from '../controllers/JWT.js'

const cartRouter = express.Router()

cartRouter.post('/add-to-cart', validateUserToken, addToCart)

cartRouter.get('/fetch-cart/:email', fetchCart)

export default cartRouter