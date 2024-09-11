import { Router } from 'express';
import { GeneralInfoController } from '../controllers/GeneralInfoController';

const router = Router();
const generalInfoController = new GeneralInfoController();

// Route to create a new GeneralInfo entry

/**
 * @swagger
 * /general-info:
 *   post:
 *     summary: Create a new General Info entry
 *     tags: [GeneralInfo]
 *     description: This endpoint allows the creation of a new General Info entry.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               field1:
 *                 type: string
 *                 description: Description of field1
 *               field2:
 *                 type: string
 *                 description: Description of field2
 *               field3:
 *                 type: number
 *                 description: Description of field3
 *             required:
 *               - field1
 *               - field2
 *     responses:
 *       201:
 *         description: Successfully created the General Info entry
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The auto-generated id of the created General Info
 *                 field1:
 *                   type: string
 *                   description: The value of field1
 *                 field2:
 *                   type: string
 *                   description: The value of field2
 *                 field3:
 *                   type: number
 *                   description: The value of field3
 *       400:
 *         description: Bad request, required fields are missing or invalid
 *       500:
 *         description: Server error
 */
router.post('/general-info', (req, res) => generalInfoController.create(req, res));

// Route to get all GeneralInfo entries
router.get('/general-info', (req, res) => generalInfoController.getAll(req, res));

// Route to get a specific GeneralInfo entry by ID
router.get('/general-info/:id', (req, res) => generalInfoController.getById(req, res));

// Route to update a GeneralInfo entry by ID
router.put('/general-info/:id', (req, res) => generalInfoController.update(req, res));

// Route to delete a GeneralInfo entry by ID
router.delete('/general-info/:id', (req, res) => generalInfoController.delete(req, res));

export default router;
