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

// Create a product
// route - POST /api/products
// Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createProduct = await product.save();
  res.status(200).json(createProduct);
});

// Update a product
// route - PUT /api/products/:id
// Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    (product.name = name),
      (product.price = price),
      (product.description = description),
      (product.image = image),
      (product.brand = brand),
      (product.category = category),
      (product.countInStock = countInStock);

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  }
  res.status(404);
  throw new Error('Product not found');
});

export { getProductById, getProducts, createProduct, updateProduct };
