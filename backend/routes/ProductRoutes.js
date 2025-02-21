import express from 'express';
import {addProduct, listProduct, removeProduct, singleProduct} from '../controller/ProductController.js'
import upload from '../middleware/Multer.js'
import AdminAuth from '../middleware/AdminAuth.js';

const productRouter = express.Router();

productRouter.post('/add',AdminAuth, upload.fields([ {name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1} ]) , addProduct);
productRouter.get('/list', listProduct);
productRouter.get('/single', singleProduct);
productRouter.post('/remove',AdminAuth , removeProduct);

export default productRouter;