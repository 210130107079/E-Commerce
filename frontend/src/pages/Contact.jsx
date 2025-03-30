import React from 'react'
import Title from '../components/Title'
import {assets} from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-3xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'}/>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-5'>
          <p className='font-medium text-xl text-gray-600'>OUR STORE 📍</p>
          <p className='text-gray-600'>  234-ShivShakti Housing Board Soc.<br/> Subhanpura, Vadodara<br/>Gujarat, Indian. 390023</p>
          <p className='text-gray-600'>Tel : <br/> +91 87995 35382</p>
          <p className='text-gray-600'>Tel : <br/> +91 87348 32301</p>
          <p className='text-gray-600'>Email : <br/>sohamtarabada2003@gmail.com</p>
          <p className='font-medium text-2xl text-gray-600'>Careers at Forever</p>
          <p className='text-gray-600'>Learn more about our teams and Job openings.</p>
          <button className='border border-black hover:bg-white hover:text-black transition-all duration-500 px-8 py-4 text-white text-sm bg-black'>APPLY FOR JOB</button>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  )
}

export default Contact