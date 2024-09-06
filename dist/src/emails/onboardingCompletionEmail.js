"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = onboardingCompletionEmail;
// resetPasswordEmail.js
var emailHeader_1 = require("./emailHeader");
var emailFooter_1 = require("./emailFooter");
// import { FRONTEND_URL } from '../config';
function onboardingCompletionEmail(user) {
    return "\n        ".concat((0, emailHeader_1.emailHeader)('complete_email'), " \n            <p>Hi ").concat(user.firstName, ",</p>\n            <p>Thank you for completing the onboarding process with Copora. We\u2019re pleased to have you moving forward with us.</p>\n            <p>Your documents are now with our Contracts Team for review. Once they\u2019ve approved the information, we\u2019ll activate your access to our booking system. This will allow you to see all the available roles and start selecting the ones that best fit your schedule.</p>\n            <p>We look forward to working with you.</p>\n            <p>If you have any questions or need further assistance, please don\u2019t hesitate to reach out.</p>\n            <p>Best regards,</p>\n            <p>The ").concat(process.env.APP_COMPANY, " Team</p>\n        ").concat((0, emailFooter_1.emailFooter)(), "    \n    ");
}
