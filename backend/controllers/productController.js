const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ApiFeatures = require('../utils/apifeatures');

// Create Product --ADMIN
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// Get All Products
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  // next(new ErrorHandler('this is a temp error', 500));
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);

  const categories = await Product.find().distinct('category');
  const products = await apiFeature.query;

  res.status(200).json({
    success: true,
    productsCount,
    products,
    resultPerPage,
    categories,
  });
});

exports.getProductCategories = catchAsyncErrors(async (req, res, next) => {
  const categories = await Product.find().distinct('category');

  res.status(200).json({
    success: true,
    categories,
  });
});

// Get Single Product
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not Found!', 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Update Product
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not Found!', 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(201).json({
    success: true,
    product,
  });
});

// Delete Product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not Found!', 404));
  }

  await product.remove();
  res.status(200).json({
    success: true,
    message: 'Product Deleted Successfully!',
  });
});

// Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString());

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;
  product.ratings = product.reviews.forEach((rev) => {
    avg = avg + rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(201).json({
    success: true,
    message: isReviewed ? 'Review Updated Successfully.' : 'Review Created Successfully.',
  });
});

// Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler('Product not Found!', 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete Review of a product
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler('Product not Found!', 404));
  }

  const reviews = product.reviews.filter((rev) => rev._id.toString() !== req.query.id.toString());

  let avg = 0;
  reviews.forEach((rev) => {
    avg = avg + rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    message: `Product's Review Deleted Successfully.`,
  });
});
