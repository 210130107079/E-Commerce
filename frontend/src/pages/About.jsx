import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className='text-3xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
          <div className='flex flex-col justify-center gap-6 ms:w-2/4 text-gray-600'>
          <p>At Clothify, we stay ahead of trends while embracing timeless elegance, ensuring our pieces remain relevant season after season. Whether you're dressing up for a special event or keeping it casual, our designs cater to your unique style needs.</p>
          <p>More than just a clothing brand, we’re a community that celebrates fashion as a form of self-expression. Join us on this journey and redefine your style with confidence.</p>
          <b className='text-gray-800 text-lg'>Our Mission - Style with Purpose</b>
          <p>Our commitment goes beyond trends—we focus on craftsmanship, sustainability, and innovation to create timeless pieces that make you look and feel your best. Whether it’s everyday essentials or bold statement outfits, our goal is to bring you fashion that fits your lifestyle.</p>
          </div>
      </div>
      <div className='text-3xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US ?'} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border border-black px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>QUALITY ASSURANCE</b>
          <p className='text-gray-600'>At Clothify, quality is at the heart of everything we create. We use premium fabrics, expert craftsmanship, and meticulous attention to detail to ensure every piece meets the highest standards. Our clothing is designed for durability, comfort, and effortless style, so you can look and feel your best every day.</p>
        </div>
        <div className='border border-black px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>CONVINIENT</b>
          <p className='text-gray-600'>At Clothify, we make shopping effortless and enjoyable. With a seamless online experience, secure payments, and fast shipping, getting your favorite styles has never been easier. Whether you're at home or on the go, our user-friendly platform ensures a hassle-free shopping experience from start to finish.</p>
        </div>
        <div className='border border-black px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>CUSTOMER SERVICE</b>
          <p className='text-gray-600'>At Clothify, your satisfaction is our top priority. Our dedicated customer service team is always ready to assist you with any questions, concerns, or styling advice. Whether you need help with orders, sizing, or returns, we’re just a message away.</p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  )
}

export default About