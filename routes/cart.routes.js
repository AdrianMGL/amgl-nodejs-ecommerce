const express = require("express");

// Controllers
const {
  getUserCart,
  addProductToCart,
  updateProductInCart,
  purchaseCart,
  removeProductFromCart,
} = require("../controllers/orders.controller");

// Middlewares
const { protectSession } = require("../middlewares/auth.middlewares");
const {
  createCartValidators,
} = require("../middlewares/validators.middlewares");

//
const router = express.Router();

router.use(protectSession);

router.get("/", getUserCart);

router.post("/add-product", createCartValidators, addProductToCart);

router.patch("/update-cart", updateProductInCart);

router.delete("/:productId", removeProductFromCart);

router.post("/purchase", purchaseCart);

//
module.exports = { cartRouter: router };
