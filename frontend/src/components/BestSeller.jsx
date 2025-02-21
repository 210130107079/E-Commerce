import React, { useContext, useEffect ,useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const BestSeller = () => {

    const {products} = useContext(ShopContext)
    const [bestSeller , setBestSeller] = useState([])

    useEffect(()=>{        
        const bestProducts = products.filter((product) => product.bestseller)
        setBestSeller(bestProducts.slice(0,5))
    },[products])

  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1={'BEST'} text2={'SELLER'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Loved by many, worn by all! Our best-selling pieces are here to keep you stylish and confident. Don’t miss out on what everyone is raving about—shop our top picks today and upgrade your wardrobe with the best of the best!</p>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                bestSeller.map((item,index)=>(
                    <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price}/>
                ))
            }
        </div>
    </div>
  )
}

export default BestSeller