const nodemailer = require("nodemailer");

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
        user: process.env.GMAIL_SMTP_USER_MAIL,
        pass: process.env.GMAIL_SMTP_USER_PASSWORD,
    },
});

const sendMailHelper = async (toEmail, subject, htmlContent) => {
    const info = await transporter.sendMail({
        from: "Social Media App",
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
                <style>
                    h1{
                        color: darkblue;
                        text-decoration: underline;
                    }
                </style>
                <body>
                    <h2>You OTP for verification is</h2>
                    <h1>${otp}</h1>
                </body>
            </html>
        `;
        await sendMailHelper(email, subject, htmlContent);
    } catch (err) {
        console.log("----- 🔴 Error in sending OTP ------", err.message);
        throw new Error("Cannot send OTP");
    }
};

module.exports = { sendOtpMailHelper };
