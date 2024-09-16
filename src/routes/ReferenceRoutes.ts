import { Router } from 'express';
import { ReferenceController } from '../controllers/ReferenceController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Reference
 *   description: API for managing references
 */

/**
 * @swagger
 * /reference:
 *   post:
 *     summary: Create or update a Reference record
 *     tags: [Reference]
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
 *               employerName:
 *                 type: string
 *                 example: "Tech Corp"
 *               contactName:
 *                 type: string
 *                 example: "John Doe"
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               address:
 *                 type: string
 *                 example: "123 Main St, Anytown, AN"
 *               referenceDetails:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     phone:
 *                       type: string
 *                       example: "+1234567890"
 *                     contactName:
 *                       type: string
 *                       example: "Jane Smith"
 *                     email:
 *                       type: string
 *                       example: "jane.smith@example.com"
 *                     address:
 *                       type: string
 *                       example: "456 Elm St, Othertown, OT"
 *     responses:
 *       201:
 *         description: Reference record created or updated successfully
 *       400:
 *         description: Bad request
 */
router.post('/', ReferenceController.createOrUpdateReference);


// /**
//  * @swagger
//  * /reference/{applicationNo}:
//  *   get:
//  *     summary: Get Reference record by Application Number
//  *     tags: [Reference]
//  *     parameters:
//  *       - in: path
//  *         name: applicationNo
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: The application number
//  *     responses:
//  *       200:
//  *         description: Reference record retrieved successfully
//  *       404:
//  *         description: Reference record not found
//  */
// router.get('/:applicationNo', ReferenceController.getReferenceByNo);

/**
 * @swagger
 * /reference/{applicationNo}:
 *   put:
 *     summary: Update Reference record by Application Number
 *     tags: [Reference]
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
 *               employerName:
 *                 type: string
 *                 example: "Tech Corp"
 *               contactName:
 *                 type: string
 *                 example: "John Doe"
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               address:
 *                 type: string
 *                 example: "123 Main St, Anytown, AN"
 *     responses:
 *       200:
 *         description: Reference record updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Reference record not found
 */
router.put('/:applicationNo', ReferenceController.updateReferenceByNo);

// /**
//  * @swagger
//  * /reference/{applicationNo}:
//  *   delete:
//  *     summary: Delete Reference record by Application Number
//  *     tags: [Reference]
//  *     parameters:
//  *       - in: path
//  *         name: applicationNo
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: The application number
//  *     responses:
//  *       200:
//  *         description: Reference record deleted successfully
//  *       404:
//  *         description: Reference record not found
//  */
// router.delete('/:applicationNo', ReferenceController.deleteReferenceByNo);

export default router;
