const { OtpModel } = require("../../../../models/otpSchema");
const bcrypt = require("bcrypt");

const verifyOtpMiddleware = async (req, res, next) => {
    try {
        console.log("----- Inside verifyOtpMiddleware -------");

        const { email, otp: userOtp } = req.body;

        const sentOtpDoc = await OtpModel.findOne({ email: email }).sort("-createdAt").lean();

        if (sentOtpDoc === null) {
            res.status(400).json({
                isSuccess: false,
                message: "Otp not found! Please resend otp...",
            });
            return;
        }

        const { otp: hashedOtp } = sentOtpDoc;

        const isCorrect = await bcrypt.compare(userOtp, hashedOtp);

        if (!isCorrect) {
            res.status(400).json({
                isSuccess: false,
                message: "Incorrect Otp",
            });
            // otp attempt count ++
            // if attempt > threshold then block the user for sometime, send a email regarding this to the user
            return;
        }

        next();
    } catch (err) {
        console.log("----- 🔴 Error in verifyOtpMiddleware -------", err.message);
        res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = { verifyOtpMiddleware };
