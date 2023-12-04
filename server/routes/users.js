const express = require("express");

const { logUser } = require("../controllers/users");
const userRouter = express.Router();

userRouter.post("/log", logUser);
// userRouter.post('/')

module.exports = userRouter;
