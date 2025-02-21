import React, { useContext, useEffect } from 'react'
import {ShopContext} from '../context/ShopContext.jsx'
import { useSearchParams } from 'react-router-dom'
import {toast} from'react-toastify'
import axios from 'axios'

const Verify = () => {

    const {navigate,token,setCartItems} = useContext(ShopContext)
    const [searchParams , setSearchParams] = useSearchParams()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verifyPayment = async () => {
        try
        {
            if(!token){
                return null
            }

            const response = await axios.post("http://localhost:5000/api/order/verifyStripe", {success ,orderId}, {headers:{token}})
            toast.success("Payment successful!")
            setCartItems({})
            navigate('/orders')
        }
        catch(error)
        {
            console.error(error)
            toast.error("Failed to verify payment")
        }
    }

    useEffect(()=>{
        verifyPayment()
    },[token])

  return (
    <div>

    </div>
  )
}

export default Verify