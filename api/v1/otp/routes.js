const express = require("express");
const { sendOtpController } = require("./controllers");

const otpRouter = express.Router();

// router level middleware
// -- it will trigger sendOtpController
// when the request match "/api/v1/otp"
// and the METHOD is "POST"

otpRouter.post("/", sendOtpController);

module.exports = { otpRouter };
