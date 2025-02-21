import {v2 as cloudinary} from 'cloudinary';
import ProductModel from '../model/ProductModel.js'


//Adding a product to the database
const addProduct = async (req, res) => {
    try
    {
        const {name, description , price, category, subCategory, sizes, bestseller } = req.body
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item)=>item !== undefined)

        let imagesURL = await Promise.all(images.map(async (item) => {
            let result = await cloudinary.uploader.upload(item.path , {resource_type: 'image'})
            return result.secure_url
        }))
        
        const productData = {
            name,
            description,
            price:Number(price),
            category,
            subCategory,
            sizes:JSON.parse(sizes),
            bestseller: bestseller === 'true'? true : false,
            image: imagesURL,
            date: Date.now()
        }
        const product = new ProductModel(productData)
        await product.save()
        res.status(201).json({ message: 'Product added successfully.' })
    }
    catch(error)
    {
        console.error(error)
        res.status(500).json({ message: 'Error adding product.' })
    }
}

//Listing a product by ID
const listProduct = async (req, res) => {
    try
    {
        const product = await ProductModel.find({}).limit([5])
        if(!product){
            return res.status(404).json({ message: 'Product not found.' })
        }
        res.status(200).json(product)
    }
    catch(error)
    {
        console.error(error)
        res.status(500).json({ message: 'Error retrieving products.' })
    }
}

//Removing a product by ID
const removeProduct = async (req, res) => {
    try
    {
        const product = await ProductModel.findByIdAndDelete(req.body.id)
        if(!product){
            return res.status(404).json({ message: 'Product not found.' })
        }
        res.status(200).json({ message: 'Product deleted successfully.' })
        
    }
    catch(error)
    {
        console.error(error)
        res.status(500).json({ message: 'Error deleting product.' })
    }
}

//Information if a product by ID
const singleProduct = async (req, res) => {
    try
    {
        const {id} = req.body
        const product = await ProductModel.findById(id)
        if(!product){
            return res.status(404).json({message: 'Product not found.' })
        }
        res.status(200).json(product)
    }
    catch(error)
    {
        console.error(error)
        res.status(500).json({ message: 'Error retrieving product.' })  
    }
}

export { addProduct, listProduct, removeProduct, singleProduct }