import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// Get all products
// route - GET /api/products
// Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 3;
  const page = Number(req.query.pageNumber || 1);

  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: 'i' } }
    : {};

  const count = await Product.countDocuments({ ...keyword });

  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.status(200).json({ products, page, pages: Math.ceil(count / pageSize) });
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

// Delete a product
// route - DELETE /api/products/:id
// Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: 'Product deleted' });
  }
  res.status(404);
  throw new Error('Product not found');
});

// Review a product
// route - POST /api/products/:id/reviews
// Private
const addProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReviewd = await product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewd) {
      res.status(400);
      throw new Error('Product already reviewd');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added!' });
  }
  res.status(404);
  throw new Error('Product not found');
});

// Get top rated products
// route - Get /api/products/top
// Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.status(200).json(products);
});

export {
  getProductById,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  addProductReview,
  getTopProducts,
};
