//importing product model
const res = require("express/lib/response")
const Product = require("../models/productModel")
const ErrorHandler = require("../utils/errorhandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const ApiFeatures = require("../utils/apiFeatures")

// Create Product --Admin
exports.createProduct = catchAsyncErrors(async (req, response, next) => {
  const product = await Product.create(req.body)

  response.status(201).json({
    success: true,
    product,
  })
})

//Get All Products
exports.getAllProducts = catchAsyncErrors(async (req, response, next) => {
  const resultPerPage = 5

  const apiFeature = new ApiFeatures(Product.find(), req.query.keyword)
    .search()
    .filter()
    .pagination(resultPerPage)
  const products = await apiFeature.query
  response.status(200).json({
    success: true,
    products,
  })
})

//Update Products -- Admin

exports.updateProduct = catchAsyncErrors(async (req, response, next) => {
  let product = await Product.findById(req.params.id)

  if (!product) {
    return response.status(500).json({
      success: false,
      message: "Product Not Found",
    })
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })
  response.status(200).json({
    success: true,
    product,
  })
})

//Get Product details

exports.getProductDetails = catchAsyncErrors(async (req, response, next) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404))
  }

  response.status(200).json({
    success: true,
    product,
  })
})

//Delete Product

exports.deleteProduct = catchAsyncErrors(async (req, response, next) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    return response.status(500).json({
      success: false,
      message: "Product Not Found",
    })
  }

  await product.remove()
  response.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  })
})
