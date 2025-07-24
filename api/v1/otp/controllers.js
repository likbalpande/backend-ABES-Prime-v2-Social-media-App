const { customAlphabet } = require("nanoid");
const { sendOtpMailHelper } = require("../../../utils/emailHelper");
const { OtpModel } = require("../../../models/otpSchema");
const nanoid = customAlphabet("123456789", 6);

const sendOtpController = async (req, res) => {
    try {
        const { email } = req.body;

        // otp generate
        const otp = nanoid();

        // send mail
        await sendOtpMailHelper(email, otp);

        // otp store db
        await OtpModel.create({ email, otp });

        res.status(201).json({
            isSuccess: true,
            message: "Otp Sent!",
        });
    } catch (err) {
        console.log("------ Error in sendOtpController ------", err.message);
        res.status(500).json({
            isSuccess: true,
            message: "Internal Server Error",
        });
    }
};

module.exports = { sendOtpController };
