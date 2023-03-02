import express from 'express'
import { validateUserToken } from '../controllers/JWT.js'
import { fetchOrders, placeOrder } from '../controllers/orders.js'

const orderRouter = express.Router()

orderRouter.put('/place-order', validateUserToken, placeOrder)

orderRouter.get('/fetch-orders/:email', fetchOrders)

export default orderRouter