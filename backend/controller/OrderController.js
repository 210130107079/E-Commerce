// import { currency } from '../../admin/src/App.jsx'
import orderModel from '../model/OrderModel.js'
import userModel from '../model/UserModel.js'
import Stripe from 'stripe'
import razorpay from 'razorpay'

const currency = 'usd'
const delivery_charges = 110

//Stripe Instance - Gateway instance
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

//placing order using cod
const placeOrderCod = async (req,res) => {
    try
    {
        const {userId,items,amount,address} = req.body
        const orderData = {userId, items, amount, address, paymentMethod: 'cod',payment:false,date:Date.now()}
        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        res.status(201).json({message: 'Order placed successfully.'})
    }
    catch(error)
    {
        console.error(error)
        res.status(500).json({message: 'Error placing order.'})
    }
}

//placing order using stripe
const placeOrderStripe = async (req, res) => {
    try
    {
        const {userId, items, amount, address} = req.body
        const {origin} = req.headers

        const orderData = {userId, items, amount, address, paymentMethod: 'Stripe',payment:false,date:Date.now()}
        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item)=>({
            price_data:{
                currency:currency,
                product_data: {
                    name:item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))
        line_items.push({
            price_data:{
                currency:currency,
                product_data: {
                    name:'Delivery Charges'
                },
                unit_amount: delivery_charges * 100
            },
            quantity:1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',            
        })
        res.json({success:true, session_url:session.url})
    }
    catch(error)
    {
        console.error(error)
        res.status(500).json({message: 'Error placing order.'})
    }
}

//Verification Stripe
const verifyStripe = async (req, res) => {
    const {orderId, userId, success} = req.body

    try
    {
        if(success === "true"){
            await orderModel.findByIdAndUpdate(orderId, {payment:true})
            await userModel.findByIdAndUpdate(userId, {cartData:{}})
            res.json({message: 'Payment successful.'})
        }
        else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({message: 'Payment cancelled.'})
        }
    }
    catch(error)
    {
        console.error(error)
        res.status(500).json({message: 'Error processing payment.'})
    }
}

//Placing order using Razorpay
const placeOrderRazorpay = async (req, res) => {
    try
    {
        const {userId, items, amount, address} = req.body
        const orderData = {userId, items, amount, address, paymentMethod: 'Razorpay',payment:false,date:Date.now()}

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()
        }
        await razorpayInstance.orders.create(options , (error , order)=>{
            if(error){
                console.error(error)
                return res.json({message: 'Error placing order.'})
            }
            res.json({success:true,order})
        })
    }
    catch(error)
    {
        console.error(error)
        res.status(500).json({message: 'Error placing order.'})
    }
}

//Userdata for frontend
const userOrders = async (req, res) => {
    try
    {
        const {userId} = req.body
        const orders = await orderModel.find({userId}) 
        res.json({success:true,orders})
    }
    catch(error)
    {
        console.error(error)
        res.status(500).json({message: 'Server Error.'})
    }
}

// Display all order in admin panel
const allOrders = async (req, res) => {
    try
    {
        const orders = await orderModel.find({})
        res.json({success:true, orders})
    }
    catch(error)
    {
        console.error(error)
        res.json({message: 'Server Error.'})
    }
}

//Update order status
const updateOrderStatus = async (req, res) => {
    try
    {
        const {orderId, status} = req.body
        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({success:true, message: 'Order status updated successfully.'})
    }
    catch(error)
    {
        console.error(error)
        res.status(500).json({message: 'Server Error.'})
    }
}

export {placeOrderCod , placeOrderStripe,placeOrderRazorpay,userOrders,allOrders,updateOrderStatus , verifyStripe}