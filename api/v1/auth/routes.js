const express = require("express");
const { userSignupController } = require("./controllers");
const { verifyOtpMiddleware } = require("../common/middlewares/verifyOtpMiddleware");

const authRouter = express.Router();

// router-level-middleware - this will be triggered
// when request METHOD matched "POST" and request endpoint "/api/v1/auth/signup"
authRouter.post("/signup", verifyOtpMiddleware, userSignupController);
// middleware chaining verifyOtpController-->next-->userSignupController
//            otherwise response from verifyOtpController

module.exports = { authRouter };
