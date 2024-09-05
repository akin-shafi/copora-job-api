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
var express_1 = require("express");
var UserController_1 = __importDefault(require("../controllers/UserController"));
var multerConfig_1 = __importDefault(require("../multerConfig")); // Import multer configuration
var AuthMiddleware_1 = require("../middlewares/AuthMiddleware"); // Import the authentication middleware
// import { isAdmin } from '../middlewares/AuthMiddleware'; // Middleware to check if user is admin
var router = (0, express_1.Router)();
/**
 * @swagger
 * /auth/users:
 *   get:
 *     summary: Retrieve all users
 *     description: Fetch all users from the database. Only accessible by admin users.
 *     tags: [Admin - Private Endpoints]
 *     responses:
 *       '200':
 *         description: A list of users
 *     security:
 *       - bearerAuth: []  # Apply bearerAuth security scheme
 */
router.get('/', AuthMiddleware_1.authenticateToken, (0, AuthMiddleware_1.authorizeRoles)('admin'), UserController_1.default.getAll);
/**
 * @swagger
 * /auth/users/{id}:
 *   get:
 *     summary: Retrieve a single user by ID
 *     tags: [Admin - Private Endpoints]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to retrieve
 *     responses:
 *       '200':
 *         description: A user object
 *       '404':
 *         description: User not found
 *     security:
 *       - bearerAuth: []  # Apply bearerAuth security scheme
 */
router.get('/:id', AuthMiddleware_1.authenticateToken, UserController_1.default.getById);
/**
 * @swagger
 * /auth/users/register:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user as a logged-in user. Only accessible by admin users.
 *     tags: [Admin - Private Endpoints]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: First name of the user
 *                 example: John
 *               middleName:
 *                 type: string
 *                 description: Middle name of the user
 *                 example: Michael
 *               lastName:
 *                 type: string
 *                 description: Last name of the user
 *                 example: Doe
 *               email:
 *                 type: string
 *                 description: Email address of the user
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 description: Password of the user
 *                 example: mypassword
 *               role:
 *                 type: string
 *                 enum: [admin, applicant]
 *                 description: Role of the user
 *                 default: applicant
 *                 example: admin
 *               createdBy:
 *                 type: string
 *                 enum: [admin, applicant]
 *                 description: User who created this account (e.g., 'admin')
 *                 default: admin
 *                 example: admin
 *     responses:
 *       '201':
 *         description: User registered successfully. Please check your email to verify your account.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully. Please check your email to verify your account.
 *       '400':
 *         description: Bad request. Required fields are missing or user already exists.
 *       '500':
 *         description: Server error.
 *     security:
 *       - bearerAuth: []  # Apply bearerAuth security scheme
 */
// router.post('/register', authenticateToken, authorizeRoles('admin'), UserController.register);
router.post('/register', UserController_1.default.register);
/**
 * @swagger
 * /auth/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Admin - Private Endpoints]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to delete
 *     responses:
 *       '204':
 *         description: User deleted successfully
 *       '404':
 *         description: User not found
 *     security:
 *       - bearerAuth: []  # Apply bearerAuth security scheme
 */
router.delete('/:id', AuthMiddleware_1.authenticateToken, UserController_1.default.delete);
/**
 * @swagger
 * /auth/users/profile/{id}:
 *   put:
 *     summary: Update user profile
 *     tags: [Admin - Private Endpoints]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 default: ""
 *               middleName:
 *                 type: string
 *                 default: ""
 *               lastName:
 *                 type: string
 *                 default: ""
 *               email:
 *                 type: string
 *                 default: ""
 *               phoneNumber:
 *                 type: string
 *                 default: ""
 *               streetAddress:
 *                 type: string
 *                 default: ""
 *               addressLine2:
 *                 type: string
 *                 default: ""
 *               city:
 *                 type: string
 *                 default: ""
 *               stateOrProvince:
 *                 type: string
 *                 default: ""
 *               postalCode:
 *                 type: string
 *                 default: ""
 *               country:
 *                 type: string
 *                 default: ""
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *               UserRole:
 *                 type: string
 *                 enum:
 *                   - admin
 *                   - applicant
 *                 default: "applicant"
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 *     security:
 *       - bearerAuth: []  # Apply bearerAuth security scheme
 */
router.put('/profile/:id', AuthMiddleware_1.authenticateToken, multerConfig_1.default.single('profilePicture'), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                if (req.file) {
                    console.log('Uploaded file:', req.file);
                }
                console.log('Form data:', req.body);
                return [4 /*yield*/, UserController_1.default.updateProfile(req, res)];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error('Error during profile update:', error_1);
                res.status(500).json({ message: 'Server error', error: error_1.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/**
 * @swagger
 * /auth/users/{id}/role:
 *   patch:
 *     summary: Update a user's role
 *     description: Updates the role of a user by their ID. Only accessible by admin users.
 *     tags: [Admin - Private Endpoints]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 description: The new role for the user
 *                 example: admin
 *             required:
 *               - role
 *     responses:
 *       200:
 *         description: User role updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User role updated successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       format: int64
 *                       example: 1
 *                     role:
 *                       type: string
 *                       example: admin
 *       400:
 *         description: Invalid input or role
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid role
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server error
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */
router.patch('/users/:id/role', AuthMiddleware_1.authenticateToken, (0, AuthMiddleware_1.authorizeRoles)('admin'), UserController_1.default.changeUserRole);
exports.default = router;
