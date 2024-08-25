"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = resetPasswordEmail;
// resetPasswordEmail.js
var emailHeader_1 = require("./emailHeader");
var emailFooter_1 = require("./emailFooter");
var config_1 = require("../config");
function resetPasswordEmail(user, resetToken) {
    return "\n                ".concat((0, emailHeader_1.emailHeader)('others'), " \n                <div style=\"padding: 20px;\">\n                    <h1 style=\"font-size: 24px; color: #333;\">Password Reset Request</h1>\n                    <p style=\"font-size: 16px; color: #333;\">Hello ").concat(user.firstName, ",</p>\n                    <p style=\"font-size: 16px; color: #333;\">\n                        We received a request to reset your password. Click the link below to reset your password:\n                    </p>\n                    <a href=\"").concat(config_1.FRONTEND_URL, "/reset-password?token=").concat(resetToken, "\" style=\"display: inline-block; margin: 20px 0; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #211c1c; text-decoration: none; border-radius: 5px;\">Reset Password</a>\n                    <p style=\"font-size: 16px; color: #333;\">\n                        If you did not request this, please ignore this email and your password will remain unchanged.\n                    </p>\n                    <p style=\"font-size: 16px; color: #333;\">Best regards,</p>\n                    <p style=\"font-size: 16px; color: #333;\">The Company Team</p>\n                </div>\n                ").concat((0, emailFooter_1.emailFooter)(), "\n           \n    ");
}
