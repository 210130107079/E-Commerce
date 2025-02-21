import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>

        <img className='w-full grid-cols-2 sm:w-1/2' src={assets.hero_img} alt=''/>

        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-5'>
            <div className='text-[#414141]'>
                <div className='flex items-center gap-2'>
                    <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                    <p className='text-lg font-medium md:text-lg'>BEST SELLER</p>
                </div>
                <h1 className='font-bold text-3xl sm:p-3 lg:text-6xl landing-relaxed'>Latest Arrivals</h1>
                <div className='flex items-center gap-2'>
                    <p className='font-medium text-lg md:text-lg'>SHOP NOW</p>
                    <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Hero