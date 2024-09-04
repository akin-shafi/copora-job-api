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
var data_source_1 = require("../data-source");
var UserEntity_1 = require("../entities/UserEntity");
var UserService_1 = require("../services/UserService");
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var crypto_1 = __importDefault(require("crypto"));
var cloudinary_1 = require("cloudinary");
var emailActions_1 = require("../lib/emailActions");
var uuid_1 = require("uuid"); // For generating verification tokens
var config_1 = require("../config");
var userService = new UserService_1.UserService();
// Configure Cloudinary
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
var UserController = /** @class */ (function () {
    function UserController() {
        this.register = this.register.bind(this);
    }
    UserController.prototype.register = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, firstName, middleName, lastName, email, password, role, accountStatus, createdBy, normalizedEmail, existingUser, applicationNo, profilePictureUrl, hashedPassword, verificationToken, newUser, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        _a = req.body, firstName = _a.firstName, middleName = _a.middleName, lastName = _a.lastName, email = _a.email, password = _a.password, role = _a.role, accountStatus = _a.accountStatus, createdBy = _a.createdBy;
                        // Validate required fields
                        if (!firstName || !lastName || !email || !password) {
                            return [2 /*return*/, res.status(400).json({ message: 'Required fields are missing' })];
                        }
                        if (!createdBy) {
                            return [2 /*return*/, res.status(400).json({ message: 'Created By field is missing' })];
                        }
                        normalizedEmail = email.trim().toLowerCase();
                        return [4 /*yield*/, userService.findByEmail(normalizedEmail)];
                    case 1:
                        existingUser = _b.sent();
                        if (existingUser) {
                            return [2 /*return*/, res.status(400).json({ message: 'User with this email already exists' })];
                        }
                        return [4 /*yield*/, this.generateApplicationNumber(role)];
                    case 2:
                        applicationNo = _b.sent();
                        return [4 /*yield*/, this.uploadProfilePicture(req.file)];
                    case 3:
                        profilePictureUrl = _b.sent();
                        return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
                    case 4:
                        hashedPassword = _b.sent();
                        verificationToken = (0, uuid_1.v4)();
                        return [4 /*yield*/, userService.create({
                                firstName: firstName,
                                middleName: middleName,
                                lastName: lastName,
                                email: normalizedEmail,
                                password: hashedPassword,
                                profilePicture: profilePictureUrl,
                                role: role,
                                createdBy: createdBy,
                                accountStatus: accountStatus,
                                verificationToken: verificationToken,
                                applicationNo: applicationNo // Save the generated application number
                            })];
                    case 5:
                        newUser = _b.sent();
                        // Send relevant email based on creator
                        return [4 /*yield*/, this.sendRelevantEmail(createdBy, { email: normalizedEmail, firstName: firstName, password: password, role: role, verificationToken: verificationToken })];
                    case 6:
                        // Send relevant email based on creator
                        _b.sent();
                        return [2 /*return*/, res.status(201).json({
                                message: "".concat(role, " registered successfully and an email has been sent.")
                            })];
                    case 7:
                        error_1 = _b.sent();
                        console.error('Error during registration:', error_1);
                        return [2 /*return*/, !res.headersSent
                                ? res.status(500).json({ message: 'Server error', error: error_1.message })
                                : undefined];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.generateApplicationNumber = function (role) {
        return __awaiter(this, void 0, void 0, function () {
            var prefix, uniqueId;
            return __generator(this, function (_a) {
                prefix = role === 'admin' ? 'ADM' : 'APP';
                uniqueId = (0, uuid_1.v4)().slice(0, 8).toUpperCase();
                return [2 /*return*/, "".concat(prefix, "-").concat(uniqueId)];
            });
        });
    };
    UserController.prototype.uploadProfilePicture = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var result, uploadError_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!file)
                            return [2 /*return*/, ''];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, cloudinary_1.v2.uploader.upload(file.path)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result.secure_url];
                    case 3:
                        uploadError_1 = _a.sent();
                        console.error('Error uploading profile picture:', uploadError_1);
                        throw new Error('Failed to upload profile picture');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.sendRelevantEmail = function (createdBy_1, _a) {
        return __awaiter(this, arguments, void 0, function (createdBy, _b) {
            var emailError_1;
            var email = _b.email, firstName = _b.firstName, password = _b.password, role = _b.role, verificationToken = _b.verificationToken;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, , 6]);
                        if (!(createdBy === 'admin' && role === 'admin')) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, emailActions_1.sendVerificationEmail)({ email: email, firstName: firstName, temporaryPassword: password }, verificationToken)];
                    case 1:
                        _c.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, (0, emailActions_1.sendInvitationToOnboard)({
                            email: email,
                            firstName: firstName,
                            loginLink: "".concat(config_1.BASE_URL, "/login"),
                            temporaryPassword: password
                        })];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        emailError_1 = _c.sent();
                        console.error('Error sending email:', emailError_1);
                        throw new Error('Failed to send email');
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.forgetPassword = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var email, normalizedEmail, user, resetToken, hashedToken, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        email = req.body.email;
                        if (!email) {
                            return [2 /*return*/, res.status(400).json({
                                    statusCode: 400,
                                    message: 'Email is required'
                                })];
                        }
                        normalizedEmail = email.trim().toLowerCase();
                        return [4 /*yield*/, userService.findByEmail(normalizedEmail)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(404).json({
                                    statusCode: 404,
                                    message: 'User not found'
                                })];
                        }
                        resetToken = crypto_1.default.randomBytes(32).toString('hex');
                        hashedToken = crypto_1.default.createHash('sha256').update(resetToken).digest('hex');
                        user.resetPasswordToken = hashedToken;
                        user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour from now
                        return [4 /*yield*/, userService.updateData(user)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, (0, emailActions_1.sendResetPasswordEmail)({ email: user.email, firstName: user.firstName }, resetToken)];
                    case 3:
                        _a.sent();
                        res.status(200).json({
                            statusCode: 200,
                            message: 'Password reset email sent'
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        console.error('Error during forget-password:', error_2);
                        res.status(500).json({
                            statusCode: 500,
                            message: 'Server error',
                            error: error_2.message
                        });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.resetPassword = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, token, newPassword, hashedToken, user, hashedPassword, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        _a = req.body, token = _a.token, newPassword = _a.newPassword;
                        if (!token || !newPassword) {
                            return [2 /*return*/, res.status(400).json({ message: 'Token and new password are required' })];
                        }
                        hashedToken = crypto_1.default.createHash('sha256').update(token).digest('hex');
                        return [4 /*yield*/, userService.findByResetToken(hashedToken)];
                    case 1:
                        user = _b.sent();
                        if (!user || user.resetPasswordExpires < new Date()) {
                            return [2 /*return*/, res.status(400).json({ message: 'Invalid or expired token' })];
                        }
                        return [4 /*yield*/, bcrypt_1.default.hash(newPassword, 10)];
                    case 2:
                        hashedPassword = _b.sent();
                        user.password = hashedPassword;
                        user.resetPassword = true;
                        user.resetPasswordToken = null;
                        user.resetPasswordExpires = null;
                        user.accountStatus = true;
                        return [4 /*yield*/, userService.updateData(user)];
                    case 3:
                        _b.sent();
                        res.status(200).json({ statusCode: 200, message: 'Password has been reset successfully' });
                        return [3 /*break*/, 5];
                    case 4:
                        error_3 = _b.sent();
                        console.error('Error during reset-password:', error_3);
                        res.status(500).json({ message: 'Server error', error: error_3.message });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.toggleTwoFactor = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, user, twoFactorToken, hashedToken, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        userId = req.body.userId;
                        if (!userId) {
                            return [2 /*return*/, res.status(400).json({ message: 'User ID is required' })];
                        }
                        return [4 /*yield*/, userService.findById(userId)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(404).json({ message: 'User not found' })];
                        }
                        if (!user.twoFactorEnabled) return [3 /*break*/, 3];
                        // Disable 2FA
                        user.twoFactorEnabled = false;
                        user.twoFactorToken = null;
                        user.twoFactorExpires = null;
                        return [4 /*yield*/, userService.updateData(user)];
                    case 2:
                        _a.sent();
                        res.status(200).json({ message: 'Two-factor authentication has been disabled' });
                        return [3 /*break*/, 6];
                    case 3:
                        twoFactorToken = Math.floor(100000 + Math.random() * 900000).toString();
                        hashedToken = crypto_1.default.createHash('sha256').update(twoFactorToken).digest('hex');
                        user.twoFactorToken = hashedToken;
                        user.twoFactorExpires = new Date(Date.now() + 300000); // 5 minutes from now
                        user.twoFactorEnabled = true;
                        return [4 /*yield*/, userService.updateData(user)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, (0, emailActions_1.sendTwoFactorCodeEmail)({ email: user.email, firstName: user.firstName }, twoFactorToken)];
                    case 5:
                        _a.sent();
                        res.status(200).json({ message: 'Two-factor authentication has been enabled. A verification code has been sent to your email.' });
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_4 = _a.sent();
                        console.error('Error toggling two-factor authentication:', error_4);
                        res.status(500).json({ message: 'Server error', error: error_4.message });
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.generateTwoFactorToken = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, loginType, user, userId, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, email = _a.email, loginType = _a.loginType;
                        if (!email) {
                            return [2 /*return*/, res.status(400).json({ message: 'User email is required' })];
                        }
                        return [4 /*yield*/, userService.findByEmail(email)];
                    case 1:
                        user = _b.sent();
                        console.log(user);
                        if (!user) {
                            return [2 /*return*/, res.status(404).json({ message: 'User not found' })];
                        }
                        userId = user.id;
                        // Generate and send the two-factor token
                        return [4 /*yield*/, userService.generateAndSendTwoFactorToken(userId, loginType)];
                    case 2:
                        // Generate and send the two-factor token
                        _b.sent();
                        res.status(200).json({ message: 'Two-factor authentication token sent' });
                        return [3 /*break*/, 4];
                    case 3:
                        error_5 = _b.sent();
                        console.error('Error generating two-factor token:', error_5);
                        res.status(500).json({ message: 'Server error', error: error_5.message });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var secret, userRepository, _a, email, password, user, isValidPassword, loginType, token, error_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        secret = process.env.JWT_SECRET || 'your-secret-key';
                        userRepository = data_source_1.AppDataSource.getRepository(UserEntity_1.User);
                        _a = req.body, email = _a.email, password = _a.password;
                        return [4 /*yield*/, userRepository.findOne({ where: { email: email } })];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(400).json({ statusCode: 400, message: 'Invalid email or password' })];
                        }
                        return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
                    case 2:
                        isValidPassword = _b.sent();
                        if (!isValidPassword) {
                            return [2 /*return*/, res.status(400).json({ statusCode: 400, message: 'Invalid email or password' })];
                        }
                        // Check if user email is verified
                        // if (!user.isVerified) {
                        //     return res.status(400).json({ statusCode: 400, message: 'Email is not verified' });
                        // }
                        // Check if user account is active
                        if (!user.accountStatus) {
                            return [2 /*return*/, res.status(401).json({ statusCode: 401, message: 'Account is not active' })];
                        }
                        if (!user.twoFactorEnabled) return [3 /*break*/, 4];
                        loginType = "password-base";
                        // Generate and send two-factor token
                        return [4 /*yield*/, userService.generateAndSendTwoFactorToken(user.id, loginType)];
                    case 3:
                        // Generate and send two-factor token
                        _b.sent();
                        return [2 /*return*/, res.status(202).json({ statusCode: 202, message: 'Two-factor is enabled authentication token sent' })];
                    case 4:
                        // Ensure JWT secret is defined
                        if (!secret) {
                            throw new Error('JWT secret key is not defined');
                        }
                        token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, secret, { expiresIn: '1h' });
                        // Respond with token and user info
                        res.status(200).json({
                            statusCode: 200,
                            token: token,
                            user: {
                                userId: user.id,
                                role: user.role,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                email: user.email,
                                resetPassword: user.resetPassword,
                                onboardingStep: user.onboardingStep,
                                applicationNo: user.applicationNo,
                                profilePicture: user === null || user === void 0 ? void 0 : user.profilePicture,
                            },
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        error_6 = _b.sent();
                        console.error('Error during login:', error_6);
                        res.status(500).json({ statusCode: 500, message: 'Server error', error: error_6.message });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.verifyTwoFactorCode = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, twoFactorCode, user, secret, token, error_7;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, email = _a.email, twoFactorCode = _a.twoFactorCode;
                        console.log(email, twoFactorCode);
                        if (!email || !twoFactorCode) {
                            return [2 /*return*/, res.status(400).json({ statusCode: 400, message: 'User email and two-factor code are required' })];
                        }
                        return [4 /*yield*/, userService.findOneAndUpdate({ email: email, twoFactorToken: twoFactorCode, twoFactorExpires: new Date() }, { twoFactorToken: null, twoFactorExpires: null }, { returnNewDocument: true })];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(400).json({ statusCode: 400, message: 'User not found or invalid two-factor code' })];
                        }
                        secret = process.env.JWT_SECRET || 'your-secret-key';
                        if (!secret) {
                            throw new Error('JWT secret key is not defined');
                        }
                        token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, secret, { expiresIn: '1h' });
                        res.status(200).json({
                            statusCode: 200,
                            token: token,
                            user: {
                                userId: user.id,
                                role: user.role,
                                firstName: user.firstName,
                                middleName: user.middleName,
                                lastName: user.lastName,
                                email: user.email,
                            },
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_7 = _b.sent();
                        console.error('Error verifying two-factor code:', error_7);
                        res.status(500).json({ statusCode: 500, message: 'Server error', error: error_7.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.updateProfile = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, userId, _a, firstName, middleName, lastName, country, stateOrProvince, postalCode, city, email, phoneNumber, file, user, result, error_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        userRepository = data_source_1.AppDataSource.getRepository(UserEntity_1.User);
                        userId = req.params.userId;
                        _a = req.body, firstName = _a.firstName, middleName = _a.middleName, lastName = _a.lastName, country = _a.country, stateOrProvince = _a.stateOrProvince, postalCode = _a.postalCode, city = _a.city, email = _a.email, phoneNumber = _a.phoneNumber;
                        file = req.file;
                        return [4 /*yield*/, userRepository.findOneBy({ id: parseInt(userId, 10) })];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(404).json({ message: 'User not found' })];
                        }
                        if (!file) return [3 /*break*/, 3];
                        return [4 /*yield*/, cloudinary_1.v2.uploader.upload(file.path)];
                    case 2:
                        result = _b.sent();
                        user.profilePicture = result.secure_url;
                        console.log('Uploaded profile picture to Cloudinary:', user.profilePicture);
                        _b.label = 3;
                    case 3:
                        if (firstName !== undefined)
                            user.firstName = firstName;
                        if (middleName !== undefined)
                            user.middleName = middleName;
                        if (lastName !== undefined)
                            user.lastName = lastName;
                        if (email !== undefined)
                            user.email = email;
                        return [4 /*yield*/, userRepository.save(user)];
                    case 4:
                        _b.sent();
                        res.status(200).json({ message: 'Profile updated successfully' });
                        return [3 /*break*/, 6];
                    case 5:
                        error_8 = _b.sent();
                        console.error('Error updating profile:', error_8);
                        res.status(500).json({ message: 'Server error', error: error_8.message });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.getUserProfile = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, user, error_9;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        userId = (_a = req.body) === null || _a === void 0 ? void 0 : _a.id;
                        if (!userId) {
                            return [2 /*return*/, res.status(401).json({ message: 'Unauthorized: No user ID found' })];
                        }
                        return [4 /*yield*/, userService.findById(userId)];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(404).json({ message: 'User not found' })];
                        }
                        res.status(200).json({
                            user: {
                                userId: user.id,
                                role: user.role,
                                firstName: user.firstName,
                                middleName: user.middleName,
                                lastName: user.lastName,
                                email: user.email,
                                accountStatus: user.accountStatus,
                            },
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_9 = _b.sent();
                        console.error('Error fetching user profile:', error_9);
                        res.status(500).json({ message: 'Server error', error: error_9.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.changeUserRole = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, role, allowedRoles, updatedUser, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = parseInt(req.params.userId, 10);
                        role = req.body.role;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        // Validate input
                        if (isNaN(userId) || !role) {
                            return [2 /*return*/, res.status(400).json({ message: 'User ID (number) and role are required' })];
                        }
                        allowedRoles = ['admin', 'user', 'manager'];
                        if (!allowedRoles.includes(role)) {
                            return [2 /*return*/, res.status(400).json({ message: 'Invalid role' })];
                        }
                        return [4 /*yield*/, userService.updateUserRole(userId, role)];
                    case 2:
                        updatedUser = _a.sent();
                        if (updatedUser) {
                            return [2 /*return*/, res.status(200).json({ message: 'User role updated successfully', user: updatedUser })];
                        }
                        else {
                            return [2 /*return*/, res.status(404).json({ message: 'User not found' })];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_10 = _a.sent();
                        console.error('Error updating user role:', error_10);
                        return [2 /*return*/, res.status(500).json({ message: 'Server error', error: error_10.message })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Update onboarding step controller
    UserController.prototype.updateOnboardingStep = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, applicationNo, onboardingStep, userRepository, user, updatedUser, error_11;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, applicationNo = _a.applicationNo, onboardingStep = _a.onboardingStep;
                        userRepository = data_source_1.AppDataSource.getRepository(UserEntity_1.User);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        // Validate input
                        if (!applicationNo || onboardingStep === undefined) {
                            return [2 /*return*/, res.status(400).json({
                                    message: "Application number and onboarding step are required",
                                })];
                        }
                        return [4 /*yield*/, UserService_1.UserService.findApplicationNo(applicationNo)];
                    case 2:
                        user = _b.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(404).json({
                                    message: "User not found",
                                })];
                        }
                        // Update the onboarding step
                        user.onboardingStep = onboardingStep;
                        return [4 /*yield*/, userRepository.save(user)];
                    case 3:
                        updatedUser = _b.sent();
                        return [2 /*return*/, res.status(200).json({
                                statusCode: 200,
                                message: "Onboarding step updated successfully",
                                onboardingStep: updatedUser.onboardingStep,
                            })];
                    case 4:
                        error_11 = _b.sent();
                        console.error("Error updating onboarding step:", error_11);
                        return [2 /*return*/, res.status(500).json({
                                message: "Server error",
                                error: error_11.message,
                            })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ;
    // Get all users
    UserController.prototype.getAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var users, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, userService.getAll()];
                    case 1:
                        users = _a.sent();
                        res.status(200).json(users);
                        return [3 /*break*/, 3];
                    case 2:
                        error_12 = _a.sent();
                        console.error('Error fetching users:', error_12);
                        res.status(500).json({ message: 'Server error', error: error_12.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Get user by ID
    UserController.prototype.getById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, user, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = parseInt(req.params.id, 10);
                        return [4 /*yield*/, userService.getById(userId)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(404).json({ message: 'User not found' })];
                        }
                        return [2 /*return*/, res.status(200).json(user)];
                    case 2:
                        error_13 = _a.sent();
                        console.error('Error fetching user:', error_13);
                        return [2 /*return*/, res.status(500).json({ message: 'Server error', error: error_13.message })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Create new user
    // Update user
    UserController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, userData, updatedUser, error_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = parseInt(req.params.id, 10);
                        userData = req.body;
                        return [4 /*yield*/, userService.update(userId, userData)];
                    case 1:
                        updatedUser = _a.sent();
                        if (!updatedUser) {
                            return [2 /*return*/, res.status(404).json({ message: 'User not found' })];
                        }
                        return [2 /*return*/, res.status(200).json(updatedUser)];
                    case 2:
                        error_14 = _a.sent();
                        console.error('Error updating user:', error_14);
                        return [2 /*return*/, res.status(500).json({ message: 'Server error', error: error_14.message })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Delete user
    UserController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, error_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = parseInt(req.params.id, 10);
                        return [4 /*yield*/, userService.delete(userId)];
                    case 1:
                        _a.sent();
                        res.status(204).send(); // No content
                        return [3 /*break*/, 3];
                    case 2:
                        error_15 = _a.sent();
                        console.error('Error deleting user:', error_15);
                        res.status(500).json({ message: 'Server error', error: error_15.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.verifyEmail = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var verifyToken, user, error_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        verifyToken = req.query.token;
                        if (!verifyToken) {
                            return [2 /*return*/, res.status(400).json({ message: 'Verification token is missing' })];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, userService.findByVerificationToken(verifyToken)];
                    case 2:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(400).json({ message: 'Invalid or expired verification token' })];
                        }
                        // Check if the user is already verified
                        if (user.isVerified) {
                            return [2 /*return*/, res.status(200).json({ message: 'Email is already verified' })];
                        }
                        // Proceed with verification
                        user.isVerified = true; // Assume there's a field to mark user as verified
                        user.verificationToken = null; // Clear the verification token
                        return [4 /*yield*/, userService.updateData(user)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, res.status(200).json({ message: 'Email verified successfully. You can now log in.' })];
                    case 4:
                        error_16 = _a.sent();
                        console.error('Error during email verification:', error_16);
                        return [2 /*return*/, res.status(500).json({ message: 'Server error', error: error_16.message })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
exports.default = new UserController();
