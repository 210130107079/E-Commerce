import { createContext ,useEffect,useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext()
const ShopContextProvider = (props) => {

    const currency = '₹';   
    const delivery_fee = 110;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search,setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems , setCartItems] = useState({})
    const navigate = useNavigate()
    const [products, setProducts] = useState([]);
    const [token ,setToken] = useState('')

    const addToCart = async (itemId , size) => 
    {
        if(!size){
            toast.error('Please select a Size !')
            return
        }

        let cartData = structuredClone(cartItems)
        if(cartData[itemId])
        {
            if(cartData[itemId][size])
            {
                cartData[itemId][size] += 1
            }
            else
            {
                cartData[itemId][size] = 1
            }
        }
        else
        {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        setCartItems(cartData)

        if(token){
            try
            {
                await axios.post(backendUrl+"/api/cart/add", { itemId, size }, {headers:{token}})
            }
            catch(error)
            {
                console.log(error);
                toast.error('Failed to add to cart')
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0
        for(const items in cartItems)
        {
            for(const item in cartItems[items])
            {
                try {
                    if(cartItems[items][item] > 0){
                        totalCount += cartItems[items][item]
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalCount
    }

    const updateQuantity = async (itemId,size,quantity) => {
        let cartData = structuredClone(cartItems)
        cartData[itemId][size] = quantity
        setCartItems(cartData)
        if(token){
            try
            {
                await axios.post(backendUrl+"/api/cart/update", { itemId, size, quantity }, {headers:{token}})
            }
            catch(error)
            {
                console.log(error);
                toast.error('Failed to update cart')
            }
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0 
        for(const items in cartItems)
        {
            let itemInfo = products.find(item=>item._id === items)
            if(itemInfo)
            {
                for(const item in cartItems[items])
                {
                    if(cartItems[items][item] > 0){
                        totalAmount += cartItems[items][item]* itemInfo.price
                    }
                }
            }
        }
        return totalAmount 
    } 

    const getProductsData = async () => {
        try
        {
// 
            const url = backendUrl + "/api/product/list";
            // console.log(url);
            const response = await axios.get(url)
            // const response = await axios.get(backendUrl + "/api/product/list")
            // console.log(response.data)
            setProducts(response.data)
        }
        catch(error)
        {
            console.log(error);
            toast.error('Failed to fetch products')
        }
    }

    const getUserCart = async (token) => {
        try
        {
            const response = await axios.get("http://localhost:5000/api/cart/get", {headers:{token}})
            setCartItems(response.data)
        }
        catch(error)
        {
            console.log(error);
            toast.error('Failed to fetch cart')
        }
    }

    useEffect(()=>{
        getProductsData()
    },[products])  

    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    },[])


    const value = {
        products , currency , delivery_fee,
        search,setSearch,showSearch,setShowSearch,
        cartItems, addToCart,setCartItems,  
        getCartCount, updateQuantity,
        getCartAmount ,navigate,
        backendUrl,
        setToken, token
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider