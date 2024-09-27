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
const data_source_1 = require("../data-source");
const UserEntity_1 = require("../entities/UserEntity");
const UserService_1 = require("../services/UserService");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const cloudinary_1 = require("cloudinary");
const emailActions_1 = require("../lib/emailActions");
const uuid_1 = require("uuid"); // For generating verification tokens
const config_1 = require("../config");
const axios_1 = __importDefault(require("axios")); // Add axios for HTTP requests
const constants_1 = require("../constants");
const userService = new UserService_1.UserService();
// Configure Cloudinary
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
class UserController {
    constructor() {
        this.register = this.register.bind(this);
    }
    linkedinCallback(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const authorizationCode = req.query.code;
            if (!authorizationCode) {
                return res.status(400).json({ message: 'Authorization code is missing' });
            }
            try {
                // Exchange authorization code for access token
                const tokenResponse = yield axios_1.default.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
                    params: {
                        grant_type: 'authorization_code',
                        code: authorizationCode,
                        redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
                        client_id: process.env.LINKEDIN_CLIENT_ID,
                        client_secret: process.env.LINKEDIN_CLIENT_SECRET
                    }
                });
                const { access_token } = tokenResponse.data;
                // Fetch LinkedIn user data
                const profileResponse = yield axios_1.default.get('https://api.linkedin.com/v2/me', {
                    headers: { Authorization: `Bearer ${access_token}` }
                });
                const emailResponse = yield axios_1.default.get('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
                    headers: { Authorization: `Bearer ${access_token}` }
                });
                const profileData = profileResponse.data;
                const email = emailResponse.data.elements[0]['handle~'].emailAddress;
                // Return LinkedIn user data
                return res.json({
                    name: `${profileData.firstName.localized.en_US} ${profileData.lastName.localized.en_US}`,
                    email
                });
            }
            catch (error) {
                console.error('Error fetching LinkedIn data:', error);
                return res.status(500).json({ message: 'Server error', error: error.message });
            }
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { firstName, middleName, lastName, email, password, role, accountStatus, createdBy } = req.body;
                // Validate required fields
                if (!firstName || !lastName || !email || !password) {
                    return res.status(400).json({ message: 'Required fields are missing' });
                }
                if (!createdBy) {
                    return res.status(400).json({ message: 'Created By field is missing' });
                }
                const normalizedEmail = email.trim().toLowerCase();
                // Check if the user already exists
                const existingUser = yield userService.findByEmail(normalizedEmail);
                if (existingUser) {
                    return res.status(400).json({ message: 'User with this email already exists' });
                }
                // Generate application number
                const applicationNo = yield this.generateApplicationNumber(role);
                // Upload profile picture if present
                const profilePictureUrl = yield this.uploadProfilePicture(req.file);
                // Hash password
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                // Create new user
                const verificationToken = (0, uuid_1.v4)();
                const newUser = yield userService.create({
                    firstName,
                    middleName,
                    lastName,
                    email: normalizedEmail,
                    password: hashedPassword,
                    profilePicture: profilePictureUrl,
                    role,
                    createdBy,
                    // accountStatus,
                    verificationToken,
                    applicationNo // Save the generated application number
                });
                // Send relevant email based on creator
                yield this.sendRelevantEmail(createdBy, { email: normalizedEmail, firstName, password, role, verificationToken });
                return res.status(200).json({
                    statusCode: 200,
                    message: `${role} registered successfully and an email has been sent.`
                });
            }
            catch (error) {
                console.error('Error during registration:', error);
                return !res.headersSent
                    ? res.status(500).json({ message: 'Server error', error: error.message })
                    : undefined;
            }
        });
    }
    generateApplicationNumber(role) {
        return __awaiter(this, void 0, void 0, function* () {
            const prefix = role === 'admin' ? 'ADM' : 'APP';
            const uniqueId = (0, uuid_1.v4)().slice(0, 8).toUpperCase(); // Unique part of the application number
            return `${prefix}-${uniqueId}`;
        });
    }
    uploadProfilePicture(file) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!file)
                return '';
            try {
                const result = yield cloudinary_1.v2.uploader.upload(file.path);
                return result.secure_url;
            }
            catch (uploadError) {
                console.error('Error uploading profile picture:', uploadError);
                throw new Error('Failed to upload profile picture');
            }
        });
    }
    sendRelevantEmail(createdBy_1, _a) {
        return __awaiter(this, arguments, void 0, function* (createdBy, { email, firstName, password, role, verificationToken }) {
            try {
                if (createdBy === 'admin' && role === 'admin') {
                    yield (0, emailActions_1.sendVerificationEmail)({ email, firstName, temporaryPassword: password }, verificationToken);
                }
                else {
                    yield (0, emailActions_1.sendInvitationToOnboard)({
                        email,
                        firstName,
                        loginLink: `${config_1.FRONTEND_LOGIN}/login`,
                        temporaryPassword: password
                    });
                }
            }
            catch (emailError) {
                console.error('Error sending email:', emailError);
                throw new Error('Failed to send email');
            }
        });
    }
    forgetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                if (!email) {
                    return res.status(400).json({
                        statusCode: 400,
                        message: 'Email is required'
                    });
                }
                const normalizedEmail = email.trim().toLowerCase();
                const user = yield userService.findByEmail(normalizedEmail);
                if (!user) {
                    return res.status(404).json({
                        statusCode: 404,
                        message: 'User not found'
                    });
                }
                const resetToken = crypto_1.default.randomBytes(32).toString('hex');
                const hashedToken = crypto_1.default.createHash('sha256').update(resetToken).digest('hex');
                user.resetPasswordToken = hashedToken;
                user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour from now
                yield userService.updateData(user);
                yield (0, emailActions_1.sendResetPasswordEmail)({ email: user.email, firstName: user.firstName }, resetToken);
                res.status(200).json({
                    statusCode: 200,
                    message: 'Password reset email sent'
                });
            }
            catch (error) {
                console.error('Error during forget-password:', error);
                res.status(500).json({
                    statusCode: 500,
                    message: 'Server error',
                    error: error.message
                });
            }
        });
    }
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token, newPassword } = req.body;
                if (!token || !newPassword) {
                    return res.status(400).json({ message: 'Token and new password are required' });
                }
                const hashedToken = crypto_1.default.createHash('sha256').update(token).digest('hex');
                const user = yield userService.findByResetToken(hashedToken);
                if (!user || user.resetPasswordExpires < new Date()) {
                    return res.status(400).json({ message: 'Invalid or expired token' });
                }
                const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
                user.password = hashedPassword;
                user.resetPassword = true;
                user.resetPasswordToken = null;
                user.resetPasswordExpires = null;
                user.accountStatus = true;
                user.onboardingStatus = constants_1.OnboardingStatus.OnboardingNotCompleted;
                yield userService.updateData(user);
                res.status(200).json({ statusCode: 200, message: 'Password has been reset successfully' });
            }
            catch (error) {
                console.error('Error during reset-password:', error);
                res.status(500).json({ message: 'Server error', error: error.message });
            }
        });
    }
    toggleTwoFactor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.body;
                if (!userId) {
                    return res.status(400).json({ message: 'User ID is required' });
                }
                const user = yield userService.findById(userId);
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                if (user.twoFactorEnabled) {
                    // Disable 2FA
                    user.twoFactorEnabled = false;
                    user.twoFactorToken = null;
                    user.twoFactorExpires = null;
                    yield userService.updateData(user);
                    res.status(200).json({ message: 'Two-factor authentication has been disabled' });
                }
                else {
                    // Enable 2FA
                    const twoFactorToken = Math.floor(100000 + Math.random() * 900000).toString();
                    const hashedToken = crypto_1.default.createHash('sha256').update(twoFactorToken).digest('hex');
                    user.twoFactorToken = hashedToken;
                    user.twoFactorExpires = new Date(Date.now() + 300000); // 5 minutes from now
                    user.twoFactorEnabled = true;
                    yield userService.updateData(user);
                    yield (0, emailActions_1.sendTwoFactorCodeEmail)({ email: user.email, firstName: user.firstName }, twoFactorToken);
                    res.status(200).json({ message: 'Two-factor authentication has been enabled. A verification code has been sent to your email.' });
                }
            }
            catch (error) {
                console.error('Error toggling two-factor authentication:', error);
                res.status(500).json({ message: 'Server error', error: error.message });
            }
        });
    }
    generateTwoFactorToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, loginType } = req.body;
                if (!email) {
                    return res.status(400).json({ message: 'User email is required' });
                }
                // Find the user by email
                const user = yield userService.findByEmail(email);
                console.log(user);
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                const userId = user.id;
                // Generate and send the two-factor token
                yield userService.generateAndSendTwoFactorToken(userId, loginType);
                res.status(200).json({ message: 'Two-factor authentication token sent' });
            }
            catch (error) {
                console.error('Error generating two-factor token:', error);
                res.status(500).json({ message: 'Server error', error: error.message });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const secret = process.env.JWT_SECRET || 'your-secret-key';
                const userRepository = data_source_1.AppDataSource.getRepository(UserEntity_1.User);
                const { email, password } = req.body;
                // Find user by email
                const user = yield userRepository.findOne({ where: { email } });
                if (!user) {
                    return res.status(400).json({ statusCode: 400, message: 'Invalid email or password' });
                }
                // Check if password is correct
                const isValidPassword = yield bcrypt_1.default.compare(password, user.password);
                if (!isValidPassword) {
                    return res.status(400).json({ statusCode: 400, message: 'Invalid email or password' });
                }
                // Check if user email is verified
                // if (!user.isVerified) {
                //     return res.status(400).json({ statusCode: 400, message: 'Email is not verified' });
                // }
                // Check if user account is active
                if (!user.accountStatus) {
                    return res.status(401).json({ statusCode: 401, message: 'Account is not active' });
                }
                // Check if two-factor authentication is enabled
                if (user.twoFactorEnabled) {
                    const loginType = "password-base";
                    // Generate and send two-factor token
                    yield userService.generateAndSendTwoFactorToken(user.id, loginType);
                    return res.status(202).json({ statusCode: 202, message: 'Two-factor is enabled authentication token sent' });
                }
                // Ensure JWT secret is defined
                if (!secret) {
                    throw new Error('JWT secret key is not defined');
                }
                // Generate JWT token
                const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, secret, { expiresIn: '1h' });
                // Respond with token and user info
                res.status(200).json({
                    statusCode: 200,
                    token,
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
            }
            catch (error) {
                console.error('Error during login:', error);
                res.status(500).json({ statusCode: 500, message: 'Server error', error: error.message });
            }
        });
    }
    verifyTwoFactorCode(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, twoFactorCode } = req.body;
                console.log(email, twoFactorCode);
                if (!email || !twoFactorCode) {
                    return res.status(400).json({ statusCode: 400, message: 'User email and two-factor code are required' });
                }
                const user = yield userService.findOneAndUpdate({ email, twoFactorToken: twoFactorCode, twoFactorExpires: new Date() }, { twoFactorToken: null, twoFactorExpires: null }, { returnNewDocument: true });
                if (!user) {
                    return res.status(400).json({ statusCode: 400, message: 'User not found or invalid two-factor code' });
                }
                const secret = process.env.JWT_SECRET || 'your-secret-key';
                if (!secret) {
                    throw new Error('JWT secret key is not defined');
                }
                const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, secret, { expiresIn: '1h' });
                res.status(200).json({
                    statusCode: 200,
                    token,
                    user: {
                        userId: user.id,
                        role: user.role,
                        firstName: user.firstName,
                        middleName: user.middleName,
                        lastName: user.lastName,
                        email: user.email,
                    },
                });
            }
            catch (error) {
                console.error('Error verifying two-factor code:', error);
                res.status(500).json({ statusCode: 500, message: 'Server error', error: error.message });
            }
        });
    }
    updateProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userRepository = data_source_1.AppDataSource.getRepository(UserEntity_1.User);
                const { userId } = req.params;
                const { firstName, middleName, lastName, country, stateOrProvince, postalCode, city, email, phoneNumber } = req.body;
                const file = req.file;
                const user = yield userRepository.findOneBy({ id: parseInt(userId, 10) });
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                if (file) {
                    const result = yield cloudinary_1.v2.uploader.upload(file.path);
                    user.profilePicture = result.secure_url;
                    console.log('Uploaded profile picture to Cloudinary:', user.profilePicture);
                }
                if (firstName !== undefined)
                    user.firstName = firstName;
                if (middleName !== undefined)
                    user.middleName = middleName;
                if (lastName !== undefined)
                    user.lastName = lastName;
                if (email !== undefined)
                    user.email = email;
                yield userRepository.save(user);
                res.status(200).json({ message: 'Profile updated successfully' });
            }
            catch (error) {
                console.error('Error updating profile:', error);
                res.status(500).json({ message: 'Server error', error: error.message });
            }
        });
    }
    getUserProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.body) === null || _a === void 0 ? void 0 : _a.id; // Access the userId from req.user
                if (!userId) {
                    return res.status(401).json({ message: 'Unauthorized: No user ID found' });
                }
                const user = yield userService.findById(userId);
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
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
            }
            catch (error) {
                console.error('Error fetching user profile:', error);
                res.status(500).json({ message: 'Server error', error: error.message });
            }
        });
    }
    changeUserRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = parseInt(req.params.userId, 10); // Convert string to number
            const { role } = req.body;
            try {
                // Validate input
                if (isNaN(userId) || !role) {
                    return res.status(400).json({ message: 'User ID (number) and role are required' });
                }
                // Validate role
                const allowedRoles = ['admin', 'user', 'manager']; // Adjust roles as necessary
                if (!allowedRoles.includes(role)) {
                    return res.status(400).json({ message: 'Invalid role' });
                }
                // Update user role
                const updatedUser = yield userService.updateUserRole(userId, role);
                if (updatedUser) {
                    return res.status(200).json({ message: 'User role updated successfully', user: updatedUser });
                }
                else {
                    return res.status(404).json({ message: 'User not found' });
                }
            }
            catch (error) {
                console.error('Error updating user role:', error);
                return res.status(500).json({ message: 'Server error', error: error.message });
            }
        });
    }
    // Update onboarding step controller
    updateOnboardingStep(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { applicationNo, onboardingStep } = req.body;
            const userRepository = data_source_1.AppDataSource.getRepository(UserEntity_1.User);
            try {
                // Validate input
                if (!applicationNo || onboardingStep === undefined) {
                    return res.status(400).json({
                        message: "Application number and onboarding step are required",
                    });
                }
                // Find the user by application number
                const user = yield UserService_1.UserService.findApplicationNo(applicationNo);
                if (!user) {
                    return res.status(404).json({
                        message: "User not found",
                    });
                }
                // Update the onboarding step
                user.onboardingStep = onboardingStep;
                // Save the updated user
                const updatedUser = yield userRepository.save(user);
                return res.status(200).json({
                    statusCode: 200,
                    message: "Onboarding step updated successfully",
                    onboardingStep: updatedUser.onboardingStep,
                });
            }
            catch (error) {
                console.error("Error updating onboarding step:", error);
                return res.status(500).json({
                    message: "Server error",
                    error: error.message,
                });
            }
        });
    }
    ;
    // Get all users
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userService.getAll();
                res.status(200).json(users);
            }
            catch (error) {
                console.error('Error fetching users:', error);
                res.status(500).json({ message: 'Server error', error: error.message });
            }
        });
    }
    // Get user by ID
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.id, 10);
                const user = yield userService.getById(userId);
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                return res.status(200).json(user);
            }
            catch (error) {
                console.error('Error fetching user:', error);
                return res.status(500).json({ message: 'Server error', error: error.message });
            }
        });
    }
    // Update user
    // async update(req: Request, res: Response): Promise<Response> {
    //   try {
    //     const userId = parseInt(req.params.id, 10);
    //     const userData = req.body;
    //     const updatedUser = await userService.update(userId, userData);
    //     if (!updatedUser) {
    //       return res.status(404).json({ message: 'User not found' });
    //     }
    //     return res.status(200).json(updatedUser);
    //   } catch (error) {
    //     console.error('Error updating user:', error);
    //     return res.status(500).json({ message: 'Server error', error: error.message });
    //   }
    // }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.id, 10);
                // Validate userId
                if (isNaN(userId)) {
                    return res.status(400).json({ message: 'Invalid user ID' });
                }
                const userData = Object.assign({}, req.body);
                // Handle password updates securely by hashing
                if (userData.password) {
                    const salt = yield bcrypt_1.default.genSalt(10);
                    userData.password = yield bcrypt_1.default.hash(userData.password, salt);
                }
                const updatedUser = yield userService.update(userId, userData);
                // Check if user exists
                if (!updatedUser) {
                    return res.status(404).json({ message: 'User not found' });
                }
                return res.status(200).json({
                    message: 'User updated successfully',
                    data: updatedUser,
                });
            }
            catch (error) {
                console.error('Error updating user:', error);
                return res.status(500).json({ message: 'Server error', error: error.message });
            }
        });
    }
    // Delete user
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.id, 10);
                yield userService.delete(userId);
                res.status(204).send(); // No content
            }
            catch (error) {
                console.error('Error deleting user:', error);
                res.status(500).json({ message: 'Server error', error: error.message });
            }
        });
    }
    verifyEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifyToken = req.query.token;
            if (!verifyToken) {
                return res.status(400).json({ message: 'Verification token is missing' });
            }
            try {
                const user = yield userService.findByVerificationToken(verifyToken);
                if (!user) {
                    return res.status(400).json({ message: 'Invalid or expired verification token' });
                }
                // Check if the user is already verified
                if (user.isVerified) {
                    return res.status(200).json({ message: 'Email is already verified' });
                }
                // Proceed with verification
                user.isVerified = true; // Assume there's a field to mark user as verified
                user.verificationToken = null; // Clear the verification token
                yield userService.updateData(user);
                return res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
            }
            catch (error) {
                console.error('Error during email verification:', error);
                return res.status(500).json({ message: 'Server error', error: error.message });
            }
        });
    }
}
exports.default = new UserController();
