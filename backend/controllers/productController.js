import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";


//@desc get all products
//@API route  api/v1/products
const getProducts = asyncHandler(async (req, res)=>{
    const products = await Product.find({});
    res.json(products);
})

//@desc get a product
//@API route  api/v1/products/:id
const getProductById = asyncHandler(async (req, res)=>{
    const product = await Product.findById(req.params.id)
    if(product){
      return res.json(product);
    }

    res.status(404)
    throw new Error('404 not found')
})

export {getProducts, getProductById}