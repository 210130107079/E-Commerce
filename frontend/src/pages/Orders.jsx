import React, { useContext , useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from'../components/Title'
import axios from 'axios'
import { toast } from 'react-toastify'
import CartTotal from '../components/CartTotal'

const Orders = () => {

  const {currency ,token  } = useContext(ShopContext)
  const [orderData , setOrderData] = useState([])

  const loadOrderData = async () => {
    try
    {
      if(!token){
         return null
      }

      const response = await axios.post("http://localhost:5000/api/order/userorders",{},{headers:{token}})
      if(response.data.success){
        let allOrderItem = []
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrderItem.push(item)
          })
        })
        setOrderData(allOrderItem.reverse())
      }
    }
    catch(error)
    {
      console.log(error)
      toast.error('Failed to fetch orders')
    }
  }

  useEffect(()=>{
    loadOrderData()
  },[token])

  return (
    <div className='border-t pt-16'>
      <div className='text-3xl mb-5'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {
          orderData.map((item,index)=>{
          return(
          <div key={index} className='py-4 border-t border-b text-gray-700 items-center flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div className='flex items-start gap-6 text-sm'>
              <img className='w-16 sm:w-20' src={item.image[0]} alt=''/>
            </div>
            <div className=''>
              <p className='sm:text-base font-medium'>{item.name}</p>
              <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                <p >{item.price}{currency}.00</p>
                <p>Quantity : {item.quantity}</p>
                <p>Size : {item.size}</p>
              </div>
              <p className='mt-1'>Date : <span className='text-gray-500'>{new Date(item.date).toDateString()}</span></p>
            </div>
            <div className='md:w-1/2 flex justify-between'>
            <div className='flex items-center gap-2'>
              <p className='min-w-2 h-2 rounded-full bg-green-700'></p>
              <p className='text-sm md:text-base'>{item.status}</p>
            </div>
            <button onClick={loadOrderData} className='bg-black text-white active:bg-gray-400 border px-4 py-2 text-sm font-medium rounded-sm '>Track Order</button>
            </div>
          </div>
          )
        })}
      </div>
    </div>
  )
}

export default Orders