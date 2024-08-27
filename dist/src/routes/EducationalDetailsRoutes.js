"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var EducationalDetailsController_1 = require("../controllers/EducationalDetailsController");
var router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: EducationalDetails
 *   description: API for managing educational details records
 */
/**
 * @swagger
 * /educational-details:
 *   post:
 *     summary: Create a new Educational Details record
 *     tags: [EducationalDetails]
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
 *               schoolName:
 *                 type: string
 *                 example: "Springfield University"
 *               certificateObtained:
 *                 type: string
 *                 example: "Bachelor of Science"
 *               courseOfStudy:
 *                 type: string
 *                 example: "Computer Science"
 *               yearAdmitted:
 *                 type: number
 *                 example: 2015
 *               yearGraduated:
 *                 type: number
 *                 example: 2019
 *     responses:
 *       201:
 *         description: Educational Details record created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', EducationalDetailsController_1.EducationalDetailsController.createEducationalDetails);
// /**
//  * @swagger
//  * /educational-details/{applicationNo}:
//  *   get:
//  *     summary: Get Educational Details by Application Number
//  *     tags: [EducationalDetails]
//  *     parameters:
//  *       - in: path
//  *         name: applicationNo
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: The application number
//  *     responses:
//  *       200:
//  *         description: Educational Details retrieved successfully
//  *       404:
//  *         description: Educational Details not found
//  */
// router.get('/:applicationNo', EducationalDetailsController.getEducationalDetailsByNo);
/**
 * @swagger
 * /educational-details/{applicationNo}:
 *   put:
 *     summary: Update Educational Details by Application Number
 *     tags: [EducationalDetails]
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
 *               schoolName:
 *                 type: string
 *                 example: "Springfield University"
 *               certificateObtained:
 *                 type: string
 *                 example: "Bachelor of Arts"
 *               courseOfStudy:
 *                 type: string
 *                 example: "Graphic Design"
 *               yearAdmitted:
 *                 type: number
 *                 example: 2016
 *               yearGraduated:
 *                 type: number
 *                 example: 2020
 *     responses:
 *       200:
 *         description: Educational Details updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Educational Details not found
 */
router.put('/:applicationNo', EducationalDetailsController_1.EducationalDetailsController.updateEducationalDetailsByNo);
// /**
//  * @swagger
//  * /educational-details/{applicationNo}:
//  *   delete:
//  *     summary: Delete Educational Details by Application Number
//  *     tags: [EducationalDetails]
//  *     parameters:
//  *       - in: path
//  *         name: applicationNo
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: The application number
//  *     responses:
//  *       200:
//  *         description: Educational Details deleted successfully
//  *       404:
//  *         description: Educational Details not found
//  */
// router.delete('/:applicationNo', EducationalDetailsController.deleteEducationalDetailsByNo);
exports.default = router;
