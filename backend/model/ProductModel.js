import mongoose from "mongoose";

const ProductScheme = new mongoose.Schema({
    name:{ type: String, required: true },
    description:{ type: String, required: true },
    price:{ type: Number, required: true },
    image:{ type: Array , required: true },
    category:{ type: String, required: true },
    subCategory:{ type: String, required: true },
    sizes:{ type: Array, required: true },
    bestseller:{ type: Boolean },
    date:{ type: Date, required: true } 
    
})

const productModel = mongoose.model("Product", ProductScheme);

export default productModel;