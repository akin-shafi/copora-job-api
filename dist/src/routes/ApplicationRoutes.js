"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var ApplicationController_1 = require("../controllers/ApplicationController");
var router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: Applicants
 *   description: The applicant management API
 */
/**
 * @swagger
 * /{applicationNo}:
 *   get:
 *     summary: Fetch single applicant data
 *     tags: [Applicants]
 *     parameters:
 *       - in: path
 *         name: applicationNo
 *         required: true
 *         description: The application number of the applicant
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with applicant details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   description: The user details of the applicant
 *                 application:
 *                   type: object
 *                   description: Application details
 *                 personalDetails:
 *                   type: object
 *                   description: Personal details of the applicant
 *                 contactDetails:
 *                   type: object
 *                   description: Contact details of the applicant
 *                 professionalDetails:
 *                   type: object
 *                   description: Professional details of the applicant
 *                 educationalDetails:
 *                   type: object
 *                   description: Educational details of the applicant
 *                 healthAndDisability:
 *                   type: object
 *                   description: Health and disability information of the applicant
 *                 foodSafetyQuestionnaire:
 *                   type: object
 *                   description: Food safety questionnaire responses of the applicant
 *                 bankDetails:
 *                   type: object
 *                   description: Bank details of the applicant
 *                 agreementConsent:
 *                   type: object
 *                   description: Agreement and consent details of the applicant
 *                 reference:
 *                   type: object
 *                   description: Reference details of the applicant
 *       404:
 *         description: Applicant not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error details
 */
router.get('/:applicationNo', ApplicationController_1.ApplicationController.getApplicantData); // Fetch single applicant data
// /**
//  * @swagger
//  * /applicants:
//  *   get:
//  *     summary: Fetch all applicants data
//  *     tags: [Applicants]
//  *     responses:
//  *       200:
//  *         description: Successful response with a list of all applicants
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 type: object
//  *                 properties:
//  *                   applicationNo:
//  *                     type: string
//  *                     description: The application number of the applicant
//  *                   user:
//  *                     type: object
//  *                     description: The user details of the applicant
//  *                   application:
//  *                     type: object
//  *                     description: Application details
//  *                   personalDetails:
//  *                     type: object
//  *                     description: Personal details of the applicant
//  *                   contactDetails:
//  *                     type: object
//  *                     description: Contact details of the applicant
//  *                   professionalDetails:
//  *                     type: object
//  *                     description: Professional details of the applicant
//  *                   educationalDetails:
//  *                     type: object
//  *                     description: Educational details of the applicant
//  *                   healthAndDisability:
//  *                     type: object
//  *                     description: Health and disability information of the applicant
//  *                   foodSafetyQuestionnaire:
//  *                     type: object
//  *                     description: Food safety questionnaire responses of the applicant
//  *                   bankDetails:
//  *                     type: object
//  *                     description: Bank details of the applicant
//  *                   agreementConsent:
//  *                     type: object
//  *                     description: Agreement and consent details of the applicant
//  *                   reference:
//  *                     type: object
//  *                     description: Reference details of the applicant
//  *       500:
//  *         description: Internal server error
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  *                   description: Error details
//  */
// router.get('/applicants', ApplicationController.getAllApplicants); // Fetch all applicants data
exports.default = router;
