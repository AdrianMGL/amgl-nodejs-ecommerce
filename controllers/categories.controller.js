// Models
const { Category } = require("../models/category.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");

/**
 *
 */
const getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.findAll({
    where: { status: "active" },
  });

  res.status(200).json({
    status: "success",
    data: {
      categories,
    },
  });
});

/**
 *
 */
const getCategoriesByID = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const categories = await Category.findOne({});

  res.status(200).json({
    status: "success",
    data: { categories },
  });
});

/**
 *
 */
const createCategorie = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const { sessionUser } = req;
  const { id } = req.params;

  const newCategorie = await Category.create({
    name,
  });

  res.status(201).json({
    status: "success",
    data: { newCategorie },
  });
});

/**
 *
 */
const updateCategorie = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const { categorie } = req;

  await categorie.update({ name });

  res.status(200).json({
    status: "success",
    data: { categorie },
  });
});

//
module.exports = {
  getAllCategories,
  getCategoriesByID,
  createCategorie,
  updateCategorie,
};
