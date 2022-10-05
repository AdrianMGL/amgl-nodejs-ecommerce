// Models
const { Product } = require("../models/product.model");
const { ProductImg } = require("../models/productImg.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");

// firebase
const {
  uploadProductImgs,
  getProductsImgsUrls,
} = require("../utils/firebase.util");

/**
 *
 */
const getAllProducts = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const products = await Product.findAll({
    where: { status: "active" },
    include: [
      {
        model: ProductImg,
      },
    ],
  });

  //
  const productsWithImgs = await getProductsImgsUrls(products);

  res.status(200).json({
    status: "success",
    data: {
      products: productsWithImgs,
    },
  });
});

/**
 *
 */
const getProductsByID = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const products = await Product.findOne({
    where: { id, status: "active" },
  });

  res.status(200).json({
    status: "success",
    data: { products },
  });
});

/**
 *
 */
const createProduct = catchAsync(async (req, res, next) => {
  const { title, description, quantity, price, categoryId } = req.body;
  const { sessionUser } = req;
  const { id } = req.params;

  const newProduct = await Product.create({
    title,
    description,
    quantity,
    price,
    categoryId,
    userId: sessionUser.id,
  });

  // ADD IMGS
  await uploadProductImgs(req.files, newProduct.id);

  res.status(201).json({
    status: "success",
    data: { newProduct },
  });
});

/**
 *
 */
const updateProduct = catchAsync(async (req, res, next) => {
  const { title, description, quantity, price } = req.body;
  const { product } = req;

  await product.update({ title, description, quantity, price });

  res.status(200).json({
    status: "success",
    data: { product },
  });
});

/**
 *
 */
const deleteProduct = catchAsync(async (req, res, next) => {
  const { product } = req;

  await product.update({ status: "disabled" });

  res.status(200).json({
    status: "success",
  });
});

//
module.exports = {
  getAllProducts,
  getProductsByID,
  createProduct,
  updateProduct,
  deleteProduct,
};
