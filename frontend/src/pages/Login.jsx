import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import {ShopContext} from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

  const [currentState , setCurrentState] = useState('Login')
  const {token , setToken , navigate , backendUrl} = useContext(ShopContext)
  const [name,setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const handleSubmit = async (e) => {
    e.preventDefault()    

    try
    {
      if(currentState == 'Sign Up'){
        const response = await axios.post(backendUrl+"/api/user/register",{name,email,password})
        setToken(response.data.token)
        localStorage.setItem('token',response.data.token)
        toast.success('User registered successfully')
      }
      else{
        const response = await axios.post(backendUrl+"/api/user/login",{email,password})
        setToken(response.data.token)
        localStorage.setItem('token',response.data.token)
        toast.success('User logged in successfully')
      }
    }
    catch(error)
    {
      console.log(error)
      toast.error('Server Error')
    }
  }

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])

  return (
    <form className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex gap-2 mb-2 mt-10 items-center'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>
      {currentState == 'Login' ? '' : <input onChange={(e)=>setName(e.target.value)} value={name} className='border rounded-sm w-full px-3 py-2 border-gray-800 ' placeholder='Name' type='text' required/> }
      <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border rounded-sm w-full px-3 py-2 border-gray-800 ' placeholder='E-Mail' type='E-email' required/>
      <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border rounded-sm w-full px-3 py-2 border-gray-800 ' placeholder='Password' type='password' required/>
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p>Forgot Password ?</p>
        {currentState == 'Login' ? 
        <p onClick={()=> setCurrentState('Sign Up')} className='cursor-pointer'>Create Account</p> : 
        <p onClick={()=> setCurrentState('Login')} className='cursor-pointer'>Login Here</p>}
      </div>
      <button onClick={handleSubmit} className='bg-black text-white font-light px-8 py-2 mt-4 active:bg-gray-500'>{currentState === 'Login' ? 'Login' : 'Sign Up'}</button>
    </form>
  )
}

export default Login