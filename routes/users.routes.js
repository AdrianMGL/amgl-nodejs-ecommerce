const express = require("express");

// Controllers
const {
  getAllUsers,
  getUserProducts,
  getAllOrders,
  getOrderById,
  createUser,
  updateUser,
  deleteUser,
  login,
} = require("../controllers/users.controller");

// Middlewares
const { userExists } = require("../middlewares/users.middlewares");
const {
  protectSession,
  protectUsersAccount,
  protectAdmin,
} = require("../middlewares/auth.middlewares");
const {
  createUserValidators,
} = require("../middlewares/validators.middlewares");

const usersRouter = express.Router();

usersRouter.post("/signup", createUserValidators, createUser);

usersRouter.post("/login", login);

// Protecting below endpoints
usersRouter.use(protectSession);

usersRouter.get("/", getAllUsers);

usersRouter.get("/me", getUserProducts);

usersRouter.get("/orders", getAllOrders);

usersRouter.get("/orders/:id", getOrderById);

usersRouter.patch("/:id", userExists, protectUsersAccount, updateUser);

usersRouter.delete("/:id", userExists, protectUsersAccount, deleteUser);

module.exports = { usersRouter };
