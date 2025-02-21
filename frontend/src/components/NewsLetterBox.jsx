import React, { useState } from 'react'

const NewsLetterBox = () => {

  const [email, setEmail] = useState('')

    const onSubmitHandler = (e) => {
        e.preventDefault()
        window.location.href= `mailto:sohamtarabada2003@gmail.com?subject=Newsletter Subscription&body=Hello, I would like to subscribe to the newsletter. My email is ${email}`
    }

  return (
    <div className='text-center'>
        <p className='text-2xl mb-4 font-medium text-gray-800'>Subscribe Now to Get 20% Off</p>
        <p className='text-gray-400 mt-3 mb-4'>🎉 Limited Time Offer – Get 20% Off! 🎉</p>

        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border'>
            <input onChange={(e)=>setEmail(e.target.value)} className='w-full sm:flex-1 outline-none' type='email' placeholder='   Enter Your Email' required />
            <button className='bg-black text-white text-xs px-10 py-4 hover:bg-gray-600' type='submit'>Subscribe !</button>
        </form>
    </div>
  )
}

export default NewsLetterBox