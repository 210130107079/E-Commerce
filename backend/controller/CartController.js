import userModel from '../model/UserModel.js'
import {toast} from'react-toastify'

//add product to cart
const addToCart = async (req, res) => {
    try
    {
        const {userId , itemId , size} = req.body
        const userData = await userModel.findById(userId)
        let cartData = userData.cartData

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1
            }
            else{
                cartData[itemId][size] = 1
            }
        }
        else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        await userModel.findByIdAndUpdate(userId, {cartData})
        res.status(200).json({ message: 'Item added to cart.' })
    }
    catch(error)
    {
        console.error(error)
        res.status(500).json({ message: 'Server Error.' })
    }
}

//update the cart
const updateCart = async (req, res) => {
    try
    {
        const {userId, itemId, size, quantity} = req.body
        const userData = await userModel.findById(userId)
        let cartData = userData.cartData
        cartData[itemId][size] = quantity

        await userModel.findByIdAndUpdate(userId, {cartData})
        res.status(200).json({ message: 'Cart updated successfully.' })
    }
    catch(error)
    {
        console.error(error)
        res.status(500).json({ message: 'Server Error.' })
    }
}

//get users cart data
const getUserCart = async (req, res) => {
    try
    {
       const { userId } = req.body
       const userData = await userModel.findById(userId)
       let cartData = userData.cartData
       res.json({success:true , cartData:cartData})  
    }
    catch(error)
    {
        console.error(error)
        res.json({ message: 'Server Error.' })
    }
}

export { addToCart, updateCart, getUserCart }