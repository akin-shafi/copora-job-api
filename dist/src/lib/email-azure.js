"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = sendEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
// Create a transporter using Azure SMTP relay configuration
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.office365.com", // Azure SMTP host (e.g., Office 365)
    port: 587, // Port for TLS (use 25 if not using TLS)
    secure: false, // Set to true if using port 465, otherwise false
    auth: {
        user: process.env.AZURE_EMAIL_USER, // Azure email address (Office 365 account)
        pass: process.env.AZURE_EMAIL_PASS, // Password or App Password for the email account
    },
    tls: {
        ciphers: "SSLv3", // Optional: Ensures compatibility with older ciphers
    },
});
// Function to send an email
function sendEmail(to, subject, html, attachments) {
    return __awaiter(this, void 0, void 0, function* () {
        const mailOptions = {
            from: "info@copora.com", // Ensure this matches your verified domain in Azure
            to,
            subject,
            html,
            attachments, // optional attachments, if provided
        };
        try {
            yield transporter.sendMail(mailOptions);
            console.log(`Email sent to ${to} successfully`);
        }
        catch (error) {
            console.error("Error sending email:", error);
        }
    });
}
