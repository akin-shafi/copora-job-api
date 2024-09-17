"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var NextOfKinController_1 = require("../controllers/NextOfKinController");
var router = (0, express_1.Router)();
var nextOfKinController = new NextOfKinController_1.NextOfKinController();
/**
 * @swagger
 * /next-of-kin:
 *   post:
 *     summary: Create or update Next of Kin information
 *     tags: [Next Of Kin]
 *     description: Creates a new Next of Kin entry if it doesn't exist, or updates an existing entry based on the `applicationNo`.
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
 *               firstname:
 *                 type: string
 *                 description: FirstName of the Next of Kin
 *               lastname:
 *                 type: string
 *                 description: lastName of the Next of Kin
 *               relationship:
 *                 type: string
 *                 description: Relationship of the Next of Kin to the applicant
 *               email:
 *                 type: string
 *                 description: email of the Next of Kin
 *               phone:
 *                 type: string
 *                 description: Phone number of the Next of Kin
 *               address:
 *                 type: string
 *                 description: Address of the Next of Kin
 *             required:
 *               - applicationNo
 *               - firstname
 *               - lastname
 *               - relationship
 *     responses:
 *       201:
 *         description: Successfully created the Next of Kin entry
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Entry created
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID of the newly created entry
 *                     applicationNo:
 *                       type: string
 *                     firstname:
 *                       type: string
 *                     lastname:
 *                       type: string
 *                     relationship:
 *                       type: string
 *                     email:
 *                       type: string
 *                     phoneNumber:
 *                       type: string
 *                     address:
 *                       type: string
 *       200:
 *         description: Successfully updated the existing Next of Kin entry
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Next of Kin updated
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID of the updated entry
 *                     applicationNo:
 *                       type: string
 *                     firstname:
 *                       type: string
 *                     lastname:
 *                       type: string
 *                     email:
 *                       type: string
 *                     relationship:
 *                       type: string
 *                     phoneNumber:
 *                       type: string
 *                     address:
 *                       type: string
 *       400:
 *         description: Applicant does not exist
 *       500:
 *         description: Internal Server Error
 */
router.post('/', function (req, res) { return nextOfKinController.create(req, res); });
router.get('/', function (req, res) { return nextOfKinController.getAll(req, res); });
router.get('/:id', function (req, res) { return nextOfKinController.getById(req, res); });
router.put('/:id', function (req, res) { return nextOfKinController.update(req, res); });
router.delete('/:id', function (req, res) { return nextOfKinController.delete(req, res); });
exports.default = router;
