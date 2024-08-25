import { Router } from 'express';
import { ProfessionalDetailsController } from '../controllers/ProfessionalDetailsController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: ProfessionalDetails
 *   description: API for managing professional details
 */

/**
 * @swagger
 * /professional-details:
 *   post:
 *     summary: Create a new Professional Details record
 *     tags: [ProfessionalDetails]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               applicationNo:
 *                 type: string
 *                 example: "APP123456"
 *               companyName:
 *                 type: string
 *                 example: "Tech Corp"
 *               jobTitle:
 *                 type: string
 *                 example: "Software Engineer"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2022-01-01"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2023-01-01"
 *               responsibilities:
 *                 type: string
 *                 example: "Developing and maintaining web applications"
 *               achievements:
 *                 type: string
 *                 example: "Led a successful project deployment"
 *               referenceContactName:
 *                 type: string
 *                 example: "Jane Doe"
 *               referenceContactPhone:
 *                 type: string
 *                 example: "+1234567890"
 *               referenceContactEmail:
 *                 type: string
 *                 example: "jane.doe@example.com"
 *     responses:
 *       201:
 *         description: Professional Details record created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', ProfessionalDetailsController.createProfessionalDetails);

/**
 * @swagger
 * /professional-details/{applicationNo}:
 *   get:
 *     summary: Get Professional Details record by Application Number
 *     tags: [ProfessionalDetails]
 *     parameters:
 *       - in: path
 *         name: applicationNo
 *         schema:
 *           type: string
 *         required: true
 *         description: The application number
 *     responses:
 *       200:
 *         description: Professional Details record retrieved successfully
 *       404:
 *         description: Professional Details record not found
 */
router.get('/:applicationNo', ProfessionalDetailsController.getProfessionalDetailsByNo);

/**
 * @swagger
 * /professional-details/{applicationNo}:
 *   put:
 *     summary: Update Professional Details record by Application Number
 *     tags: [ProfessionalDetails]
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
 *               companyName:
 *                 type: string
 *                 example: "Tech Corp"
 *               jobTitle:
 *                 type: string
 *                 example: "Software Engineer"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2022-01-01"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2023-01-01"
 *               responsibilities:
 *                 type: string
 *                 example: "Developing and maintaining web applications"
 *               achievements:
 *                 type: string
 *                 example: "Led a successful project deployment"
 *               referenceContactName:
 *                 type: string
 *                 example: "Jane Doe"
 *               referenceContactPhone:
 *                 type: string
 *                 example: "+1234567890"
 *               referenceContactEmail:
 *                 type: string
 *                 example: "jane.doe@example.com"
 *     responses:
 *       200:
 *         description: Professional Details record updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Professional Details record not found
 */
router.put('/:applicationNo', ProfessionalDetailsController.updateProfessionalDetailsByNo);

/**
 * @swagger
 * /professional-details/{applicationNo}:
 *   delete:
 *     summary: Delete Professional Details record by Application Number
 *     tags: [ProfessionalDetails]
 *     parameters:
 *       - in: path
 *         name: applicationNo
 *         schema:
 *           type: string
 *         required: true
 *         description: The application number
 *     responses:
 *       200:
 *         description: Professional Details record deleted successfully
 *       404:
 *         description: Professional Details record not found
 */
router.delete('/:applicationNo', ProfessionalDetailsController.deleteProfessionalDetailsByNo);

export default router;
