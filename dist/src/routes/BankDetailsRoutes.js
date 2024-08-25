"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var BankDetailsController_1 = require("../controllers/BankDetailsController");
var router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: BankDetails
 *   description: API for managing bank details records
 */
/**
 * @swagger
 * /bank-details:
 *   post:
 *     summary: Create a new Bank Details record
 *     tags: [BankDetails]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               applicationNo:
 *                 type: string
 *                 example: "APP12345"
 *               bankName:
 *                 type: string
 *                 example: "Bank of Example"
 *               accountNumber:
 *                 type: string
 *                 example: "12345678"
 *               sortCode:
 *                 type: string
 *                 example: "12-34-56"
 *               accountName:
 *                 type: string
 *                 example: "John Doe"
 *               employmentStatusDeclaration:
 *                 type: string
 *                 example: "Employed"
 *     responses:
 *       201:
 *         description: Bank Details record created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', BankDetailsController_1.BankDetailsController.createBankDetails);
/**
 * @swagger
 * /bank-details/{applicationNo}:
 *   get:
 *     summary: Get Bank Details by Application Number
 *     tags: [BankDetails]
 *     parameters:
 *       - in: path
 *         name: applicationNo
 *         schema:
 *           type: string
 *         required: true
 *         description: The application number
 *     responses:
 *       200:
 *         description: Bank Details retrieved successfully
 *       404:
 *         description: Bank Details not found
 */
router.get('/:applicationNo', BankDetailsController_1.BankDetailsController.getBankDetailsByNo);
/**
 * @swagger
 * /bank-details/{applicationNo}:
 *   put:
 *     summary: Update Bank Details by Application Number
 *     tags: [BankDetails]
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
 *               bankName:
 *                 type: string
 *                 example: "Bank of Example Updated"
 *               accountNumber:
 *                 type: string
 *                 example: "87654321"
 *               sortCode:
 *                 type: string
 *                 example: "65-43-21"
 *               accountName:
 *                 type: string
 *                 example: "Jane Doe"
 *               employmentStatusDeclaration:
 *                 type: string
 *                 example: "Self-employed"
 *     responses:
 *       200:
 *         description: Bank Details updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Bank Details not found
 */
router.put('/:applicationNo', BankDetailsController_1.BankDetailsController.updateBankDetailsByNo);
/**
 * @swagger
 * /bank-details/{applicationNo}:
 *   delete:
 *     summary: Delete Bank Details by Application Number
 *     tags: [BankDetails]
 *     parameters:
 *       - in: path
 *         name: applicationNo
 *         schema:
 *           type: string
 *         required: true
 *         description: The application number
 *     responses:
 *       200:
 *         description: Bank Details deleted successfully
 *       404:
 *         description: Bank Details not found
 */
router.delete('/:applicationNo', BankDetailsController_1.BankDetailsController.deleteBankDetailsByNo);
exports.default = router;
