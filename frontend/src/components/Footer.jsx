import React from 'react'
import { assets } from '../assets/assets'
import {Link, useNavigate} from 'react-router-dom';

const Footer = () => {

    const navigate = useNavigate()

  return (
    <div className=''>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

            <div>
                <img src={assets.logo} className='mb-5 w-32' alt="" />
                <p className='w-full md:w-2/3 text-gray-600'>At clothify, we blend style, comfort, and quality to bring you trendsetting fashion. From everyday essentials to statement pieces, our collection is designed to make you stand out effortlessly.</p>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <Link reloadDocument to={'/'}>Home</Link>
                    <Link reloadDocument to={'/about'}>About</Link>
                    <Link reloadDocument to={'/contact'}>Contact Us</Link>
                    <Link reloadDocument to={'/privacy-policy'}>Privacy Policy</Link>
                </ul>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <a href='tel:+918799535382'>+91 87995 35382</a>
                    <a href='tel:+918734832301'>+91 87348 32310</a>
                    <a href='mailto:sohamtarabada2003@gmail.com'>sohamtarabada2003@gmail.com</a>
                </ul>
            </div>

        </div>

        <div>
            <hr />
            <p className='py-5 text-sm text-center'>© Copyright 2025 @clothify9898.com - All Rights Reserved</p>
        </div>

    </div>
  )
}

export default Footer