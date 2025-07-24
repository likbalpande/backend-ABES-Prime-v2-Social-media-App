const express = require("express");
const { authRouter } = require("./auth/routes");
const { otpRouter } = require("./otp/routes");

const apiRouter = express.Router();

// router level middleware -- it will trigger authRouter when the request match "/api/v1/auth..."
apiRouter.use("/otp", otpRouter);
apiRouter.use("/auth", authRouter);

module.exports = { apiRouter };
