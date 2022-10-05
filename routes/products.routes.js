const express = require("express");

// Controllers
const {
  getAllProducts,
  getProductsByID,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products.controller");

const {
  getAllCategories,
  createCategorie,
  updateCategorie,
} = require("../controllers/categories.controller");

// Middlewares
const { productExists } = require("../middlewares/products.middlewares");
const {
  protectSession,
  protectProductsOwners,
  protectAdmin,
  protectUsersAccount,
  protectCategoriesOwners,
} = require("../middlewares/auth.middlewares");
const {
  createProductValidators,
  createCategorieValidators,
} = require("../middlewares/validators.middlewares");
const { categorieExists } = require("../middlewares/categories.middlewares");

// Utils
const { upload } = require("../utils/multer.util");

/** */
const productsRouter = express.Router();

productsRouter.get("/categories", getAllCategories);

productsRouter.get("/", getAllProducts);

productsRouter.get("/:id", getProductsByID);

productsRouter.use(protectSession);

productsRouter.post("/", upload.array("productImg", 4), createProduct);

productsRouter.patch(
  "/:id",
  productExists,
  protectProductsOwners,
  updateProduct
);

productsRouter.delete(
  "/:id",
  productExists,
  protectUsersAccount,
  deleteProduct
);

productsRouter.post("/categories", createCategorieValidators, createCategorie);

productsRouter.patch("/categories/:id", categorieExists, updateCategorie);

//
module.exports = { productsRouter };
