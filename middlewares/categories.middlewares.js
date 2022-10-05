// Models
const { Category } = require("../models/category.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

/**
 *
 */
const categorieExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const categorie = await Category.findOne({ where: { id } });

  if (!categorie) {
    return next(new AppError("Categorie not found", 404));
  }

  req.categorie = categorie;
  next();
});

//
module.exports = { categorieExists };
