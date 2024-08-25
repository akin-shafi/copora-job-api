"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = verificationEmail;
var emailHeader_1 = require("./emailHeader");
var emailFooter_1 = require("./emailFooter");
var config_1 = require("../config");
// emails/verificationEmail.ts
function verificationEmail(user, verificationToken) {
    var verificationUrl = "".concat(config_1.FRONTEND_URL, "/verify-email?token=").concat(verificationToken);
    return "\n        ".concat((0, emailHeader_1.emailHeader)('others'), "\n        <div>\n          <h2 style=\"text-align: center;\">Verify and sign in</h2>\n          <p>Hello ").concat(user.firstName || 'User', ",</p>\n          <p>Verify yourself below to sign in to your ").concat(process.env.APP_COMPANY, " account for <strong>").concat(user.email, "</strong>.</p>\n          <p>Your password is: <strong>").concat(user.temporaryPassword, "</strong></p>\n          <p>The link can only be used once and expires in 10 minutes if you don\u2019t use it.</p>\n          <a href=\"").concat(verificationUrl, "\" style=\"display: inline-block; background-color: #211c1c; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px;\">Verify me</a>\n          <h3>How does this work?</h3>\n          <p>This secure, one-time URL lets you confirm your identity without a password. If you already have a password, this won\u2019t replace it, so you can still sign in with it later.</p>\n          <p>If you didn't request this verification link, you can safely ignore this email.</p>\n          <p>Don\u2019t see a button above? <a href=\"").concat(verificationUrl, "\" style=\"color: #211c1c; text-decoration: none;\">Verify yourself here</a></p>\n        </div>\n        ").concat((0, emailFooter_1.emailFooter)(), "\n  ");
}
