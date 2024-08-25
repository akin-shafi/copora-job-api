"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = twoFactorEmail;
var emailHeader_1 = require("./emailHeader");
var emailFooter_1 = require("./emailFooter");
// export default function generateTwoFactorEmailTemplate(user: { firstName?: string }, token: string) {
function twoFactorEmail(user, resetToken) {
    return "\n            ".concat((0, emailHeader_1.emailHeader)('others'), "\n            <div style=\"padding: 20px;\">\n                <p>Hi ").concat(user.firstName, ",</p>\n                <p>Your Two-Factor Authentication (2FA) code is:</p>\n                <h2 style=\"text-align: center;\">").concat(resetToken, "</h2>\n                <p>This code will expire in 5 minutes.</p>\n                <p>Best regards,<br>Your Team</p>\n            </div>\n            ").concat((0, emailFooter_1.emailFooter)(), "\n");
}
