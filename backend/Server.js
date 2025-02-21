import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config/Mongodb.js'
import connectCloudinary from './config/Cloudinary.js'
import userRouter from './routes/UserRoutes.js'
import productRouter from './routes/ProductRoutes.js'
import cartRouter from './routes/CartRoutes.js'
import orderRouter from './routes/OrderRoute.js'

//App Config
const app = express()
const PORT = process.env.PORT || 5000

//DB Config
connectDB()
connectCloudinary()

//Middlewares
app.use(express.json())
app.use(cors())

//API Endpoints
app.use('/api/user', userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get('/', (req, res) => {
    res.send('API Working')
})

app.listen(PORT , ()=>{
    console.log(`Server running on port ${PORT}`)  //Server is running on port 5000
 
})