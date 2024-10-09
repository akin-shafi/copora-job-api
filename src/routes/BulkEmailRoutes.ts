import { Router } from 'express';
import BulkEmailController from '../controllers/BulkEmailController';

const router = Router();

/**
 * @swagger
 * /bulk-email/send-bulk-email:
 *   post:
 *     summary: Send bulk email to specified email addresses
 *     description: Allows admin to send bulk emails to a list of recipients with a custom subject and content.
 *     tags: [Admin - Private Endpoints]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emails:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: email
 *                   description: Email address of the recipient.
 *                   example: "johndoe@example.com"
 *                 description: An array of recipient email addresses.
 *                 example: [
 *                   "johndoe@example.com",
 *                   "janedoe@example.com"
 *                 ]
 *               customSubject:
 *                 type: string
 *                 description: The subject of the email.
 *                 example: "Welcome to our platform!"
 *               customContent:
 *                 type: string
 *                 description: The content/body of the email.
 *                 example: "Hello, we're excited to have you with us. Let's get started!"
 *           required:
 *             - emails
 *             - customSubject
 *             - customContent
 *     responses:
 *       200:
 *         description: Bulk email sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bulk email sent successfully.
 *                 recipients:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: johndoe@example.com
 *       400:
 *         description: Bad request, missing or invalid fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Emails array is required and should not be empty.
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server error.
 *     security:
 *       - bearerAuth: []  # Apply bearerAuth security scheme
 */

router.post('/send-bulk-email', BulkEmailController.sendBulkEmail);

export default router;
