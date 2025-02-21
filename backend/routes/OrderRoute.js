import express from 'express'
import {placeOrderCod , placeOrderStripe,placeOrderRazorpay,userOrders,allOrders,updateOrderStatus,verifyStripe} from '../controller/OrderController.js'
import AdminAuth from '../middleware/AdminAuth.js'
import authUser from'../middleware/UserAuth.js'

const orderRouter = express.Router()

//Admin Routes
orderRouter.post('/list',AdminAuth, allOrders)
orderRouter.post('/status',AdminAuth,updateOrderStatus)

//Payment Routes
orderRouter.post('/place',authUser,placeOrderCod)
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)

//User Feature
orderRouter.post('/userorders',authUser,userOrders)

//Verification Payment
orderRouter.post('/verifyStripe',authUser, verifyStripe)

export default orderRouter