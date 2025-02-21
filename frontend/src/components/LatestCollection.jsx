import React, { useContext , useEffect , useState } from 'react'
import { ShopContext } from '../context/ShopContext.jsx'
import Title from '../components/Title.jsx'
import ProductItem from '../components/ProductItem.jsx'

const LatestCollection = () => {

    const {products} = useContext(ShopContext)
    const [LatestProducts , SetLatestProducts] = useState([])

    useEffect(()=>{
        const latest = products.slice(0, 10)
        SetLatestProducts(latest)
    },[products])

  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'LATEST'} text2={'COLLECTION'} />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Step into the season with style! Our latest collection brings you a perfect blend of trendy designs, premium fabrics, and unbeatable comfort. Elevate your wardrobe with fresh colors, bold prints, and modern silhouettes that make you stand out.<br></br>Shop now and redefine your style with our newest arrivals!</p>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 '>
            {LatestProducts.map((item,index)=>(
                    <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
            ))}
        </div>

    </div>
  )
}

export default LatestCollection