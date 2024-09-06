"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = onboardingReminderEmail;
// resetPasswordEmail.js
var emailHeader_1 = require("./emailHeader");
var emailFooter_1 = require("./emailFooter");
// import { FRONTEND_URL } from '../config';
function onboardingReminderEmail(user) {
    return "\n        ".concat((0, emailHeader_1.emailHeader)('remainder'), " \n            <p>Hi ").concat(user.firstName, ",</p>\n            <p>We noticed that your onboarding process with Copora is still incomplete. If you\u2019re having any trouble providing the necessary information or if you\u2019re unsure about any of the steps, please don\u2019t hesitate to get in touch. We\u2019re here to assist you and make the process as smooth as possible.</p>\n            <p>Completing your onboarding is essential for accessing our booking system and viewing available roles, so please reach out if you need any help.</p>\n            <p>\n                Best regards,\n                <br/>\n                The ").concat(process.env.APP_COMPANY, " Team\n            </p>\n        ").concat((0, emailFooter_1.emailFooter)(), "    \n    ");
}
