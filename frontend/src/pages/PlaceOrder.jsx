import React, { useContext , useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

  
  const {navigate,backendUrl ,token,cartItems,setCartItems,getCartAmount,delivery_fee,products} = useContext(ShopContext)
  const [method , setMethod] = useState('cod')
  const [formData , setFormData] = useState({
    firstName : '',
    lastName : '',
    email : '',
    street : '',
    city:'',
    state:'',
    country:'',
    zipcode:'',
    phone:''
  })
  
  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value

    setFormData(data => ({...data,[name]:value}))
  }

  const initPay = (order) => { 
    const options = {
      key:import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount:order.amount,
      currency:order.currency,
      name:'Order Payment',
      description:'Order Payment',
      order_id:order.id,
      receipt:order.receipt,
      handle: async (res) => {
        console.log(res);
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try
    {
      let orderItems = []
      for(const items in cartItems)
      {
        for(const item in cartItems[items])
        {
          if(cartItems[items][item] > 0){
            const itemInfo = structuredClone(products.find(item=>item._id === items))
            if(itemInfo){
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount()+delivery_fee
      }

      switch(method)
      {
        case 'cod':
          const response = await axios.post("http://localhost:5000/api/order/place",orderData,{headers:{token}})
          // console.log(response.data);
          setCartItems({})
          toast.success('Order placed successfully')
          navigate('/orders')
          break
        
        case 'stripe':
          const responseStripe = await axios.post("http://localhost:5000/api/order/stripe",orderData,{headers:{token}})
          const {session_url} = responseStripe.data
          window.location.replace(session_url)
          break

        default:
          break
      }
      
    }
    catch(error)
    {
      console.error(error)
      toast.error('Failed to place order')
    }
  }


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'}/><hr/>
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} type="text" className='w-full px-3.5 py-1.5 border border-gray-800 rounded ' placeholder='First Name'/>
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} type="text" className='w-full px-3.5 py-1.5 border border-gray-800 rounded ' placeholder='Last Name'/>
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} type="email" className='w-full px-3.5 py-1.5 border border-gray-800 rounded ' placeholder='E-Mail'/>
        <input required onChange={onChangeHandler} name='street' value={formData.street} type="text" className='w-full px-3.5 py-1.5 border border-gray-800 rounded ' placeholder='Street Address'/>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} type="text" className='w-full px-3.5 py-1.5 border border-gray-800 rounded ' placeholder='City'/>
          <input required onChange={onChangeHandler} name='state' value={formData.state} type="text" className='w-full px-3.5 py-1.5 border border-gray-800 rounded ' placeholder='State'/>
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='country' value={formData.country} type="text" className='w-full px-3.5 py-1.5 border border-gray-800 rounded ' placeholder='Country'/>
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} type="number" className='w-full px-3.5 py-1.5 border border-gray-800 rounded ' placeholder='Pin-Code'/>
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formData.phone} type="number" className='w-full px-3.5 py-1.5 border border-gray-800 rounded ' placeholder='Contact Number'/>
      </div>

      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal/>
        </div>
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHODS'}/>
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={()=>setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-500' : ''}`}>
                <img src={assets.stripe_logo} className='h-5 mx-5' alt="" />
              </p>
            </div>
            <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-500' : ''}`}>
                <p className='text-black text-sm font-medium mx-5'>CASH ON DELIVERY</p>
              </p>
            </div>
          </div>
          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder