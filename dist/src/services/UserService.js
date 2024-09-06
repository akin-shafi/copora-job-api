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
exports.UserService = void 0;
var typeorm_1 = require("typeorm");
var data_source_1 = require("../data-source");
var UserEntity_1 = require("../entities/UserEntity");
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var crypto_1 = __importDefault(require("crypto"));
var emailActions_1 = require("../lib/emailActions");
var userRepository = data_source_1.AppDataSource.getRepository(UserEntity_1.User);
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.register = function (arg0) {
        throw new Error('Method not implemented.');
    };
    UserService.prototype.login = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user, isValidPassword, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userRepository.findOne({ where: { email: email } })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new Error('Invalid email or password');
                        }
                        return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
                    case 2:
                        isValidPassword = _a.sent();
                        if (!isValidPassword) {
                            throw new Error('Invalid email or password');
                        }
                        token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
                        return [2 /*return*/, token];
                }
            });
        });
    };
    UserService.prototype.findByVerificationToken = function (verifyToken) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, userRepository.findOne({ where: { verificationToken: verifyToken } })];
            });
        });
    };
    UserService.prototype.verifyUser = function (verifyToken) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findByVerificationToken(verifyToken)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new Error('Invalid or expired verification token');
                        }
                        user.isVerified = true;
                        user.verificationToken = null; // Clear the token
                        return [4 /*yield*/, userRepository.save(user)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.updateProfile = function (id, updatedData) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userRepository.findOneBy({ id: id })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new Error('User not found');
                        }
                        Object.assign(user, updatedData); // Update user fields
                        return [4 /*yield*/, userRepository.save(user)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.updateUserRole = function (id, role) {
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRepository = data_source_1.AppDataSource.getRepository(UserEntity_1.User);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, userRepository.findOneBy({ id: id })];
                    case 2:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, null];
                        }
                        // Update the user role
                        user.role = role;
                        return [4 /*yield*/, userRepository.save(user)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, user];
                    case 4:
                        error_1 = _a.sent();
                        console.error('Error updating user role in service:', error_1);
                        throw error_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.findOneAndUpdate = function (filter, update, options) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, userRepository.findOne({
                                where: {
                                    email: filter.email,
                                    twoFactorToken: filter.twoFactorToken,
                                    twoFactorExpires: (0, typeorm_1.MoreThan)(new Date()), // Use MoreThan for date comparison
                                },
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            console.log('User not found or two-factor token is invalid');
                            return [2 /*return*/, null]; // User not found or two-factor token is invalid
                        }
                        // If accountStatus is false, set it to true
                        if (!user.accountStatus) {
                            console.log('Activating user account');
                            user.accountStatus = true;
                        }
                        if (!options.returnNewDocument) return [3 /*break*/, 3];
                        console.log('Updating user with new values:', {
                            twoFactorToken: update.twoFactorToken,
                            twoFactorExpires: update.twoFactorExpires,
                        });
                        user.twoFactorToken = update.twoFactorToken;
                        user.twoFactorExpires = update.twoFactorExpires;
                        return [4 /*yield*/, userRepository.save(user)];
                    case 2:
                        _a.sent(); // Save the updated user
                        console.log('User updated successfully');
                        _a.label = 3;
                    case 3: return [2 /*return*/, user];
                    case 4:
                        error_2 = _a.sent();
                        console.error('Error in findOneAndUpdate:', error_2);
                        throw new Error('Error updating user');
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.findById = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, userRepository.findOne({ where: { id: userId } })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user || null]; // Return null if user is not found
                    case 2:
                        error_3 = _a.sent();
                        console.error('Error finding user by ID:', error_3);
                        throw new Error('Error retrieving user');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Get all users
    UserService.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, userRepository.find()];
            });
        });
    };
    // Get user by ID
    UserService.prototype.getById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, userRepository.findOneBy({ id: id })];
            });
        });
    };
    // Create new user
    UserService.prototype.create = function (userData) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                user = userRepository.create(userData);
                return [2 /*return*/, userRepository.save(user)];
            });
        });
    };
    // Update user
    UserService.prototype.update = function (id, userData) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userRepository.findOneBy({ id: id })];
                    case 1:
                        user = _a.sent();
                        if (user) {
                            Object.assign(user, userData);
                            return [2 /*return*/, userRepository.save(user)];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    // Delete user
    UserService.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userRepository.delete(id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.findByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, userRepository.findOne({ where: { email: email } })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_4 = _a.sent();
                        console.error('Error finding user by email:', error_4);
                        throw new Error('Could not find user by email');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // static async findApplicationNo(applicationNo: string): Promise<User | null> {
    //   try {
    //     return await userRepository.findOne({ where: { applicationNo } });
    //   } catch (error) {
    //     console.error('Error finding user by applicationNo:', error);
    //     throw new Error('Could not find user by applicationNo');
    //   }
    // }
    UserService.findApplicationNo = function (applicationNo) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userRepository.findOneBy({ applicationNo: applicationNo })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.findByResetToken = function (resetPasswordToken) {
        return __awaiter(this, void 0, void 0, function () {
            var error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, userRepository.findOne({
                                where: {
                                    resetPasswordToken: resetPasswordToken,
                                    resetPasswordExpires: (0, typeorm_1.MoreThan)(new Date()),
                                },
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_5 = _a.sent();
                        console.error('Error finding user by reset token:', error_5);
                        throw new Error('Could not find user by reset token');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.generateAndSendTwoFactorToken = function (id, loginType) {
        return __awaiter(this, void 0, void 0, function () {
            var user, twoFactorToken, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, userRepository.findOneBy({ id: id })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new Error('User not found');
                        }
                        twoFactorToken = Math.floor(100000 + Math.random() * 900000).toString();
                        // const twoFactorToken = crypto.randomBytes(3).toString("hex");
                        user.twoFactorToken = twoFactorToken;
                        user.twoFactorExpires = new Date(Date.now() + 300000); // 5 minutes from now
                        user.twoFactorEnabled = true;
                        return [4 /*yield*/, this.updateData(user)];
                    case 2:
                        _a.sent();
                        if (!(loginType == "password-less")) return [3 /*break*/, 4];
                        return [4 /*yield*/, (0, emailActions_1.sendLoginLink)({ email: user.email, firstName: user.firstName }, twoFactorToken)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, (0, emailActions_1.sendTwoFactorCodeEmail)({ email: user.email, firstName: user.firstName }, twoFactorToken)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_6 = _a.sent();
                        console.error('Error generating or sending two-factor token:', error_6);
                        throw new Error('Could not generate or send two-factor token');
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.verifyTwoFactorCode = function (email, twoFactorCode) {
        return __awaiter(this, void 0, void 0, function () {
            var hashedCode, user, expiredUser, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        hashedCode = crypto_1.default.createHash('sha256').update(twoFactorCode).digest('hex');
                        return [4 /*yield*/, userRepository.findOne({
                                where: {
                                    email: email,
                                    twoFactorToken: hashedCode,
                                    twoFactorExpires: (0, typeorm_1.MoreThan)(new Date())
                                }
                            })];
                    case 1:
                        user = _a.sent();
                        if (!!user) return [3 /*break*/, 3];
                        return [4 /*yield*/, userRepository.findOne({
                                where: {
                                    email: email,
                                    twoFactorExpires: (0, typeorm_1.LessThan)(new Date())
                                }
                            })];
                    case 2:
                        expiredUser = _a.sent();
                        if (expiredUser) {
                            return [2 /*return*/, 'The two-factor code has expired. Please request a new one.'];
                        }
                        return [2 /*return*/, 'Invalid email or two-factor code.'];
                    case 3:
                        // Clear the two-factor token and expiry date after successful verification
                        user.twoFactorToken = null;
                        user.twoFactorExpires = null;
                        user.twoFactorEnabled = false;
                        return [4 /*yield*/, this.updateData(user)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, 'Two-factor verification successful.'];
                    case 5:
                        error_7 = _a.sent();
                        console.error('Error verifying two-factor code:', error_7);
                        throw new Error('Error verifying two-factor code');
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.updateData = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, userRepository.save(user)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_8 = _a.sent();
                        console.error('Error updating user:', error_8);
                        throw new Error('Could not update user');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.findUsersWithIncompleteOnboarding = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, userRepository.createQueryBuilder('user')
                        .where('user.onboardingStep < :step', { step: 5 })
                        .andWhere('user.role = :role', { role: 'admin' })
                        .getMany()];
            });
        });
    };
    return UserService;
}());
exports.UserService = UserService;
