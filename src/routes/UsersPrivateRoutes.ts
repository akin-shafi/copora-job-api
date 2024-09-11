import { Router } from 'express';
import UserController from '../controllers/UserController';
// import multer from '../multerConfig'; // Import multer configuration
import uploadDocumentsAndImages  from '../multerConfig'; // Import multer configuration

import { authenticateToken, authorizeRoles } from '../middlewares/AuthMiddleware'; // Import the authentication middleware
// import { isAdmin } from '../middlewares/AuthMiddleware'; // Middleware to check if user is admin

const router = Router();

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
router.get('/:id', authenticateToken, UserController.getById);

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
router.get('/', authenticateToken, authorizeRoles('admin'), UserController.getAll);


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
router.post('/register',  UserController.register);

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
router.delete('/:id', authenticateToken, UserController.delete);

/**
 * @swagger
 * /auth/users/{id}:
 *   put:
 *     summary: Update user by ID
 *     description: Update user information by user ID. Optionally, update the password, which will be securely hashed.
 *     tags: [Admin - Private Endpoints]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *               email:
 *                 type: string
 *                 description: The user's email
 *               password:
 *                 type: string
 *                 description: The user's new password (will be hashed)
 *               role:
 *                 type: string
 *                 enum: [admin, institution, researcher, explorer]
 *                 description: The user's role
 *     responses:
 *       200:
 *         description: Successfully updated the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid user ID or bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid user ID
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
 */
router.put('/:id',  authenticateToken, UserController.update);

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
router.put('/profile/:id',  authenticateToken, uploadDocumentsAndImages.single('profilePicture'), async (req, res) => {
    try {
        if (req.file) {
        console.log('Uploaded file:', req.file);
        }
        console.log('Form data:', req.body);
        await UserController.updateProfile(req, res);
    } catch (error) {
        console.error('Error during profile update:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

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
router.patch('/users/:id/role',  authenticateToken, authorizeRoles('admin'), UserController.changeUserRole);


export default router;