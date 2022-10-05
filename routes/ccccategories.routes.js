const express = require("express");

// Controllers
const {
  getAllCategories,
  getCategoriesByID,
  createCategorie,
  updateCategorie,
  deleteCategorie,
} = require("../controllers/categories.controller");

// Middlewares
const { categorieExists } = require("../middlewares/categories.middlewares");
const {
  protectSession,
  protectProductsOwners,
  protectAdmin,
} = require("../middlewares/auth.middlewares");
const {
  createCategorieValidators,
} = require("../middlewares/validators.middlewares");

/** */
const categoriesRouter = express.Router();

categoriesRouter.get("/", getAllCategories);

categoriesRouter.get("/:id", getCategoriesByID);

categoriesRouter.use(protectSession);

categoriesRouter.post("/:id", createCategorieValidators, createCategorie);

categoriesRouter.patch("/:id", categorieExists, updateCategorie);

categoriesRouter.delete(
  "/:id",
  categorieExists,
//  protectUsersAccount,
  deleteCategorie
);

//
module.exports = { categoriesRouter };
