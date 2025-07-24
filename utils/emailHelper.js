const nodemailer = require("nodemailer");

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.email",
    auth: {
        user: "...",
        pass: "...",
    },
});

const sendMailHelper = async (toEmail, subject, htmlContent) => {
    const info = await transporter.sendMail({
        from: "",
        to: toEmail,
        subject: subject,
        html: htmlContent,
    });
    console.log(`Message sent to ${toEmail}:`, info.messageId);
};

const sendOtpMailHelper = async (email, otp) => {
    try {
        const subject = "OTP verification at Social Media App";
        const htmlContent = `
            <html>
                <body>
                    <h2>You OTP for verification is</h2>
                    <h1>${otp}</h1>
                </body>
            </html>
        `;
        await sendMailHelper(email, subject, htmlContent);
    } catch (err) {}
};

module.exports = { sendOtpMailHelper };
