import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// Get all products
// route - GET /api/products
// Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
});

// Get single product
// route - Get /api/products/:id
// Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error(`Resource not found`);
  }
  res.status(200).json(product);
});

export { getProductById, getProducts };
