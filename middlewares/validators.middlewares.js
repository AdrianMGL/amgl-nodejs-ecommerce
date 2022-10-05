const { body, validationResult } = require("express-validator");

// Utils
const { AppError } = require("../utils/appError.util");

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // [{ ..., msg }] -> [msg, msg, ...] -> 'msg. msg. msg. msg'
    const errorMessages = errors.array().map((err) => err.msg);

    const message = errorMessages.join(". ");

    return next(new AppError(message, 400));
  }
  next();
};

//
const createUserValidators = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),
  body("email").isEmail().withMessage("Must provide a valid email"),
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  checkValidations,
];

//
const createProductValidators = [
  body("title")
    .isString()
    .withMessage("Title must be a string")
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters"),
  body("description")
    .isString()
    .withMessage("Description must be a string")
    .isLength({ min: 5 })
    .withMessage("Description must be at least 5 characters"),
  body("quantity")
    .isInt()
    .withMessage("Quantity must be a number")
    .isLength({ min: 1 })
    .withMessage("Quantity must be at least 1 number long"),
  body("price")
    .isInt()
    .withMessage("Price must be a number")
    .isLength({ min: 1 })
    .withMessage("Price must be at least 1 number long"),

  checkValidations,
];

//
const createCategorieValidators = [
  body("name")
    .isString()
    .withMessage("Title must be a string")
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters"),
  checkValidations,
];

//
const createCartValidators = [
  body("productId")
    .isInt()
    .withMessage("product Id must be a number")
    .isLength({ min: 1 })
    .withMessage("product Id must be at least 1 number long"),
  body("quantity")
    .isInt()
    .withMessage("Quantity must be a number")
    .isLength({ min: 1 })
    .withMessage("Quantity must be at least 1 number long"),
  checkValidations,
];

//
module.exports = {
  createUserValidators,
  createProductValidators,
  createCategorieValidators,
  createCartValidators,
};
