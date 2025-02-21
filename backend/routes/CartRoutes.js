import express from 'express';
import { addToCart , updateCart , getUserCart } from '../controller/CartController.js';
import authUser from '../middleware/UserAuth.js';

const cartRouter = express.Router();

cartRouter.get('/get',authUser ,getUserCart);
cartRouter.post('/add',authUser ,addToCart);
cartRouter.post('/update',authUser ,updateCart);

export default cartRouter;