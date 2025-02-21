import axios from 'axios'
import React, { useState ,useEffect } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({token}) => {

    const [list, setList] = useState([])

    const fetchList = async () => {
        try
        {
            const response = await axios.get(backendUrl+"/api/product/list")
            setList(response.data)            
        }
        catch(error)
        {
            toast.error(error)
        }
    }

    const removeProduct = async (id) => {
        try
        {
            const response = await axios.post(backendUrl + "/api/product/remove", { id }  , {headers:{token}})
            toast.success(response.data.message)
            await fetchList()
            
        }
        catch(error)
        {
            toast.error(error)
        }
    }

    useEffect(() => {
        fetchList()
    }, [])

  return (
    <div>
    <p className='mb-2'>All Products</p>
    <div className='flex flex-col gap-2'>

        {/* LIST TABLE TITLE */}

        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
            <b>Images</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b className='text-center'>Action</b>
        </div>

        {/* PRODUCTS DISPLAYING */}
        {
            list.map((item, index) => (
                <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
                    <img className='w-20' src={item.image[0]} alt="" />
                    <p>{item.name}</p>
                    <p>{item.category}</p>
                    <p>{item.price}{currency}</p>
                    <p className='bg-red-500 hover:text-red hover:bg-white transition-all duration-200 text-black text-right md:text-center cursor-pointer text-lg' onClick={()=>removeProduct(item._id)}>DELETE</p>
                </div>
            ))
        }

    </div>
    </div>
  )
}

export default List