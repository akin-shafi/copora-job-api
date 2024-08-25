"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = signupEmail;
var emailHeader_1 = require("./emailHeader");
var emailFooter_1 = require("./emailFooter");
function signupEmail(user) {
    return "\n    ".concat((0, emailHeader_1.emailHeader)('others'), "\n      <div style=\"padding: 20px;\">\n        <h3>Welcome to ").concat(process.env.APP_COMPANY, ", ").concat(user.firstName ? user.firstName : 'User', "!</h3>\n        <p>Thank you for signing up. We're excited to have you on board!</p>\n        <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>\n        <p>Best regards,<br>The ").concat(process.env.APP_COMPANY, " Team</p>\n      </div>\n      ").concat((0, emailFooter_1.emailFooter)(), "\n  ");
}
