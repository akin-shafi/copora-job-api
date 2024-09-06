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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSignupEmail = sendSignupEmail;
exports.sendInvitationToOnboard = sendInvitationToOnboard;
exports.sendVerificationEmail = sendVerificationEmail;
exports.sendResetPasswordEmail = sendResetPasswordEmail;
exports.sendTwoFactorCodeEmail = sendTwoFactorCodeEmail;
exports.sendLoginLink = sendLoginLink;
exports.sendOnboardingReminderEmail = sendOnboardingReminderEmail;
// main.ts
var signupEmail_1 = __importDefault(require("../emails/signupEmail"));
var resetPasswordEmail_1 = __importDefault(require("../emails/resetPasswordEmail"));
var twoFactorEmail_1 = __importDefault(require("../emails/twoFactorEmail"));
var loginLinkEmail_1 = __importDefault(require("../emails/loginLinkEmail"));
var verificationEmail_1 = __importDefault(require("../emails/verificationEmail"));
var invitationToOnboardEmail_1 = __importDefault(require("../emails/invitationToOnboardEmail"));
var onboardingReminderEmail_1 = __importDefault(require("../emails/onboardingReminderEmail"));
var email_1 = require("./email");
// Function to send signup email
function sendSignupEmail(user) {
    return __awaiter(this, void 0, void 0, function () {
        var subject, html;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    subject = "Welcome to Our App!";
                    html = (0, signupEmail_1.default)(user);
                    return [4 /*yield*/, (0, email_1.sendEmail)(user.email, subject, html)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
// Function to send verification email
function sendInvitationToOnboard(user) {
    return __awaiter(this, void 0, void 0, function () {
        var subject, html;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    subject = "Invitation to Onboard";
                    html = (0, invitationToOnboardEmail_1.default)(user);
                    return [4 /*yield*/, (0, email_1.sendEmail)(user.email, subject, html)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
// Function to send verification email
function sendVerificationEmail(user, verificationToken) {
    return __awaiter(this, void 0, void 0, function () {
        var subject, html;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    subject = "Verify Your Email Address";
                    html = (0, verificationEmail_1.default)(user, verificationToken);
                    return [4 /*yield*/, (0, email_1.sendEmail)(user.email, subject, html)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
// Function to send password reset email
function sendResetPasswordEmail(user, resetToken) {
    return __awaiter(this, void 0, void 0, function () {
        var subject, html;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    subject = "Password Reset Request";
                    html = (0, resetPasswordEmail_1.default)(user, resetToken);
                    return [4 /*yield*/, (0, email_1.sendEmail)(user.email, subject, html)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
// Function to send two-factor verification email
// { email: user.email, firstName: user.firstName }, twoFactorToken
function sendTwoFactorCodeEmail(user, resetToken) {
    return __awaiter(this, void 0, void 0, function () {
        var subject, html;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    subject = "Your Two-Factor Authentication Code";
                    html = (0, twoFactorEmail_1.default)(user, resetToken);
                    return [4 /*yield*/, (0, email_1.sendEmail)(user.email, subject, html)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
// sendLoginLink({ email: user.email, firstName: user.firstName, verificationLink });
function sendLoginLink(user, twoFactorToken) {
    return __awaiter(this, void 0, void 0, function () {
        var subject, html;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    subject = "Your Login Link";
                    html = (0, loginLinkEmail_1.default)(user, twoFactorToken);
                    return [4 /*yield*/, (0, email_1.sendEmail)(user.email, subject, html)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
// Function to send onboarding reminder email
function sendOnboardingReminderEmail(user) {
    return __awaiter(this, void 0, void 0, function () {
        var subject, html;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    subject = 'Complete Your Onboarding with Copora';
                    html = (0, onboardingReminderEmail_1.default)(user);
                    return [4 /*yield*/, (0, email_1.sendEmail)(user.email, subject, html)];
                case 1:
                    _a.sent(); // Send the email
                    return [2 /*return*/];
            }
        });
    });
}
