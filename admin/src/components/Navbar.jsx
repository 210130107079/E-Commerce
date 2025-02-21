import React from 'react'
import {assets} from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
        <img className='w-[max(15%,80px)]' src={assets.logo} alt="" />
        <button onClick={()=> setToken('')} className='bg-black hover:bg-white  hover:text-black hover:border-1 transition-all duration-500 text-white px-5 py-2 sm:px-7 sm:py-2 text-xs sm:text-sm'>LOG-OUT</button>
    </div>
  )
}

export default Navbar