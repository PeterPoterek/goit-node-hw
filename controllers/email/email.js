const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const transporter = nodemailer.createTransport({
    service: "SendGrid",
    auth: {
        user: "apikey",
        pass: process.env.SENDGRID_API_KEY,
    },
});

module.exports = {
    sendVerificationEmail: async (email, verificationToken, req) => {
        try {
            const verificationLink = `${req.protocol}://${req.get(
                "host"
            )}/api/users/verify/${verificationToken}`;

            const mailOptions = {
                to: email,
                from: process.env.SENDER_EMAIL,
                subject: "Verify Your Email",
                text: `Please click the following link to verify your email: ${verificationLink}`,
            };

            await transporter.sendMail(mailOptions);
        } catch (err) {
            console.error("Error sending verification email:", err);
            throw new Error("Error sending verification email");
        }
    },
};
