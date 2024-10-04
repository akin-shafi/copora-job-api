"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AgreementDocController_1 = require("../controllers/AgreementDocController");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /agreements/create-agreement:
 *   post:
 *     summary: Create an agreement document
 *     description: This endpoint generates an agreement document based on user input. The job description is expected to be provided as a string.
 *     tags: [Agreements]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               applicationNo:
 *                 type: string
 *                 example: APP-3E5E1BE8
 *                 description: The application number of the applicant
 *               jobTitle:
 *                 type: string
 *                 example: "House Keeper"
 *                 description: The title of the job
 *               jobDescription:
 *                 type: string
 *                 description: The job description provided as a string of bullet points, each separated by a period (.)
 *                 example: "Cleaning and maintaining rooms and premises in accordance with Company standards. Ensuring supplies are stocked and equipment is maintained. Responding to requests for housekeeping services. Following health and safety regulations."
 *               startDate:
 *                 type: string
 *                 example: "09 May 2024"
 *     responses:
 *       200:
 *         description: Agreement document created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
router.post('/create-agreement', AgreementDocController_1.createAgreement);
exports.default = router;
