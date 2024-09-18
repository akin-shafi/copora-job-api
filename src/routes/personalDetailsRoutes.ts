import { Router } from 'express';
import { PersonalDetailsController } from '../controllers/PersonalDetailsController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: PersonalDetails
 *   description: API for managing personal details
 */

/**
 * @swagger
 * /personal-details:
 *   post:
 *     summary: Create a new Personal Details record
 *     tags: [PersonalDetails]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               applicationNo:
 *                 type: string
 *                 example: "APP-123456"
 *               title:
 *                 type: string
 *                 example: "Mr."
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 example: "1990-01-01"
 *               gender:
 *                 type: string
 *                 example: "Male"
 *               nationalInsuranceNumber:
 *                 type: string
 *                 example: "AB123456C"
 *               passportPhoto:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Personal Details record created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', PersonalDetailsController.createOrUpdatePersonalDetails);

/**
 * @swagger
 * /personal-details/{applicationNo}:
 *   get:
 *     summary: Get Personal Details record by Application Number
 *     tags: [PersonalDetails]
 *     parameters:
 *       - in: path
 *         name: applicationNo
 *         schema:
 *           type: string
 *         required: true
 *         description: The application number
 *     responses:
 *       200:
 *         description: Personal Details record retrieved successfully
 *       404:
 *         description: Personal Details record not found
 */
router.get('/:applicationNo', PersonalDetailsController.getPersonalDetailsByNo);

/**
 * @swagger
 * /personal-details/{applicationNo}:
 *   put:
 *     summary: Update Personal Details record by Application Number
 *     tags: [PersonalDetails]
 *     parameters:
 *       - in: path
 *         name: applicationNo
 *         schema:
 *           type: string
 *         required: true
 *         description: The application number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Mr."
 *               firstname:
 *                 type: string
 *                 example: "John"
 *               lastname:
 *                 type: string
 *                 example: "Doe"
 *               middlename:
 *                 type: string
 *                 example: "Middle"
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 example: "1990-01-01"
 *               gender:
 *                 type: string
 *                 example: "Male"
 *               nationalInsuranceNumber:
 *                 type: string
 *                 example: "AB123456C"
 *     responses:
 *       200:
 *         description: Personal Details record updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Personal Details record not found
 */
router.put('/:applicationNo', PersonalDetailsController.updatePersonalDetailsByNo);

// /**
//  * @swagger
//  * /personal-details/{applicationNo}:
//  *   delete:
//  *     summary: Delete Personal Details record by Application Number
//  *     tags: [PersonalDetails]
//  *     parameters:
//  *       - in: path
//  *         name: applicationNo
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: The application number
//  *     responses:
//  *       200:
//  *         description: Personal Details record deleted successfully
//  *       404:
//  *         description: Personal Details record not found
//  */
// router.delete('/:applicationNo', PersonalDetailsController.deletePersonalDetailsByNo);

export default router;
