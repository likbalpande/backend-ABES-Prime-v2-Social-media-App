const express = require("express");
const { userSignupController } = require("./controllers");

const authRouter = express.Router();

// router-level-middleware - this will be triggered
// when request METHOD matched "POST" and request endpoint "/api/v1/auth/signup"
authRouter.post("/signup", userSignupController);

module.exports = { authRouter };
