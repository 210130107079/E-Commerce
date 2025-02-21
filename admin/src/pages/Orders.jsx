import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {currency} from '../App.jsx'
import axios from 'axios'
import {toast} from 'react-toastify'
import {assets} from '../assets/assets.js'

const Orders = ({token}) => {

  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {
    if(!token){
      return null
    }

    try
    {
      const response = await axios.post("http://localhost:5000/api/order/list",{}, {headers:{token}})
      if(response.data.success){
        setOrders(response.data.orders)
      }else{
        console.log(response.data.message)
        toast.error(response.data.message)
      }
    }
    catch(error)
    {
      console.log(error)
      toast.error('Failed to fetch orders')
    }

  }

  const statusHandler = async (e,orderId) => {
    try
    {
      const response = await axios.post("http://localhost:5000/api/order/status",{orderId, status:e.target.value}, {headers:{token}})
      if(response.data.success){
        toast.success('Status updated successfully')
        await fetchOrders()
      }
    }
    catch(error)
    {
      console.log(error)
      toast.error('Failed to update status')
    }
  }

  useEffect(()=>{
    fetchOrders()
  },[token])

  return (
    <div>
      <h3>ORDER PAGE</h3>
      <div>
        {
          orders.map((order,index)=>(
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-400 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-800' key={index}>
              <img className='w-15' src={assets.parcel_icon} alt="" />
                <div>
                  {order.items.map((item,index)=>{
                    if(index === order.items.length - 1){
                      return <p className='py-1' key={index}>{item.name} X {item.quantity} <span>{item.size}</span></p>
                    }
                    else{
                      return <p className='py-1' key={index}>{item.name} X {item.quantity} <span>{item.size}</span></p>
                    }
                  })}
                </div>
              <p className='mt-1 mb-2 font-medium'>{order.address.firstName+ " "+order.address.lastName}</p>
              <div>
                <p>{order.address.street+","}</p> 
                <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
              </div>
              <p>{order.address.phone}</p>

              <div>
              <p className='text-sm sm:text-[15px]'>Items : {order.items.length}</p>
              <p className='mt-3'>Method : {order.paymentMethod}</p>
              <p>Payment : {order.payment ? "DONE" : "PENDING..."}</p>
              <p>Date : {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className='text-sm sm:text-[15px]'>{order.amount}{" "}{currency}</p>
            <select onChange={(e)=>statusHandler(e,order._id)} value={order.status} className='p-2 font-medium'>
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>

            

            </div>
          ))
        }
      </div>

    </div>
  )
}

export default Orders