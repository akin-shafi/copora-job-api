"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AgreementDocController_1 = require("../controllers/AgreementDocController");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /create-agreement:
 *   post:
 *     summary: Create an agreement document
 *     description: This endpoint generates an agreement document based on user input.
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
 *                 description: The application number of the applicant
 *               JobTitle:
 *                 type: string
 *                 example: "Software Engineer"
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
